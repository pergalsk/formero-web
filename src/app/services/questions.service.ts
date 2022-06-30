import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import {
  AbstractControlOptions,
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  ValidatorFn,
} from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';

import { ValidatorsService } from './validators.service';
import { UtilsService } from './utils.service';
import { FormeroValidation, FormValidationBlocksSet } from '../Validations';
import { FormeroBlockTitle, FormeroBlockText, FormTextBlocksSet } from '../Blocks';
import {
  FormeroQuestionTextbox,
  FormeroQuestionTextarea,
  FormeroQuestionDropdown,
  FormeroQuestionRadiogroup,
  FormeroQuestionCheckgroup,
  FormeroQuestionAgreementCheckbox,
  FormQuestionBlocksSet,
} from '../Question';

export interface FormBlocksSet {
  id: number;
  title: string;
  successInfo: string;
  validators: ValidatorFn[];
  options: { [param: string]: any };
  blocks: (FormQuestionBlocksSet | FormTextBlocksSet | FormValidationBlocksSet)[];
  calculationsId: number;
}

export interface RawValidatorInfo {
  type: string;
  params: Array<any> | null;
  message?: string;
}

export interface CheckGroupsKeys {
  [key: string]: string[];
}

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(
    private validatorsService: ValidatorsService,
    private utilsService: UtilsService,
    private formBuilder: UntypedFormBuilder,
    private httpClient: HttpClient
  ) {}

  getQuestions(schemaId: number) {
    return this.loadFormSchema(schemaId).pipe(
      map((formSchema) => this.processFormSchema(formSchema)),
      catchError(this.handleError('Formulár sa nepodarilo načítať.'))
    );
  }

  loadFormSchema(schemaId: number): Observable<any> {
    // return this.httpClient.get('assets/dbt-2020.form-schema.json').pipe(delay(1500));
    return this.httpClient.get(`http://localhost:8000/api/schema/${schemaId}`);
  }

  processFormSchema(formSchema) {
    // Process global validators
    if (formSchema && formSchema.validators && formSchema.validators.length) {
      formSchema.validators = formSchema.validators
        .map((rawValidator) => this.validatorsService.processRawValidators(rawValidator))
        .filter((validator) => validator); // filter falsy values
    }

    // Process form blocks
    if (formSchema && formSchema.blocks && formSchema.blocks.length) {
      formSchema.blocks = formSchema.blocks
        .map((rawFormBlock) => this.processRawFormBlock(rawFormBlock))
        .filter((formBlock) => formBlock) // filter falsy values
        .sort(this.utilsService.sortByOrderProp);
    }
    return formSchema;
  }

  processRawFormBlock(rawFormBlock) {
    if (rawFormBlock.validators && rawFormBlock.validators.length) {
      rawFormBlock.validators = rawFormBlock.validators
        .map((rawValidatorInfo) => this.validatorsService.processRawValidators(rawValidatorInfo))
        .filter((validator) => validator); // filter falsy values
    }

    // todo: move to separate directory as exported constant
    const blockTypeMap = new Map<string, any>([
      ['title', FormeroBlockTitle],
      ['blocktext', FormeroBlockText],
      ['textbox', FormeroQuestionTextbox],
      ['textarea', FormeroQuestionTextarea],
      ['radiogroup', FormeroQuestionRadiogroup],
      ['checkgroup', FormeroQuestionCheckgroup],
      ['dropdown', FormeroQuestionDropdown],
      ['agreement', FormeroQuestionAgreementCheckbox],
      ['validation', FormeroValidation],
    ]);

    const constructorFnName = blockTypeMap.get(rawFormBlock.type);
    return constructorFnName ? new constructorFnName({ ...rawFormBlock }) : null;
  }

  buildForm(questions: FormBlocksSet): UntypedFormGroup {
    const controlsConfig: { [key: string]: any } = {};
    const options: AbstractControlOptions | { [key: string]: any } = {
      validators: questions.validators,
    }; // form global validators

    // todo: refactor to switch-case
    for (const question of questions.blocks) {
      if (question instanceof FormeroValidation) {
        // todo: HANDLE MULTIPLE VALIDATORS OF THE SAME KIND

        options.validators = [...options.validators, ...question.validators]; // set as global form validators
      } else if (question instanceof FormeroQuestionCheckgroup) {
        const { key, options, validators } = question;
        const controls: UntypedFormControl[] = options.map(
          (option) =>
            new UntypedFormControl({
              value: option.value || false,
              disabled: option.disabled || false,
            })
        );
        controlsConfig[key] = new UntypedFormArray(controls, validators);
      } else if (question instanceof FormeroBlockText || question instanceof FormeroBlockTitle) {
      } else {
        const { key, value, validators } = question;
        controlsConfig[key] = [value, validators];
      }
    }

    return this.formBuilder.group(controlsConfig, options);
  }

  extractFormInitValue(formBlocks): { [key: string]: any } {
    const initValue: { [key: string]: any } = {};

    // todo: refactor to switch-case
    for (const formBlock of formBlocks) {
      if (!(formBlock instanceof FormeroBlockText || formBlock instanceof FormeroBlockTitle)) {
        if (formBlock instanceof FormeroQuestionCheckgroup) {
          const { key, options } = formBlock;
          initValue[key] = options.map((option) => option.value);
        } else {
          const { key, value } = formBlock;
          initValue[key] = value;
        }
      }
    }

    return initValue;
  }

  // Get keys of shared form fields.
  extractSharedControlKeys(formBlocks): string[] {
    return formBlocks && formBlocks.length
      ? formBlocks.filter((formBlock) => formBlock.shared).map((formBlock) => formBlock.key)
      : [];
  }

  // Get block keys for quick info section
  extractQuickInfoControlKeys(formBlocks): string[] {
    return formBlocks && formBlocks.length
      ? formBlocks.filter((formBlock) => formBlock.quickInfo).map((formBlock) => formBlock.key)
      : [];
  }

  submitAnswers(formId, answersData): Observable<any> {
    return this.httpClient
      .post(`http://localhost:8000/api/form/${formId}`, answersData)
      .pipe(catchError(this.handleError('Pri odosielaní nastala chyba.')));
  }

  handleError(message: string) {
    return (error: HttpErrorResponse) => {
      if (error.error instanceof ErrorEvent) {
        console.error('Client side error occurred: ' + error.error.message);
      } else {
        console.error('Backend side error occurred with status: ' + error.status);
        console.error('Error: ', error);
      }

      return throwError(message);
    };
  }

  prepareSubmitData(batchFormData: any[], questions: FormBlocksSet): any {
    // generate checkgroup keys for all checkgroup blocks
    const checkGroupsKeys: CheckGroupsKeys = this.extractCheckGroupsKeys(questions);

    const submitData = [];
    batchFormData.forEach((formData) => {
      // replace boolean checkgroup values with corresponding keys
      const replacedData = this.replaceCheckGroupValuesWithKeys(formData.val, checkGroupsKeys);
      submitData.push({ ...replacedData, sum: formData.sum });
    });

    return submitData;
  }

  extractCheckGroupsKeys(questions: FormBlocksSet): CheckGroupsKeys {
    // todo: handle null values
    return questions.blocks.reduce(
      (result, block) => ({
        ...result,
        ...(block instanceof FormeroQuestionCheckgroup
          ? { [block.key]: block.options.map((option) => option.key) }
          : {}),
      }),
      {}
    );
  }

  replaceCheckGroupValuesWithKeys(formData: any, checkGroupsKeys: CheckGroupsKeys): any {
    // todo: change to map (and simplify)
    for (const [key, value] of Object.entries(checkGroupsKeys)) {
      formData[key] = formData[key].reduce((outputToken, current, index) => {
        return current ? outputToken + (outputToken.length ? '|' : '') + value[index] : outputToken;
      }, '');
    }
    return formData;
  }

  generateQR() {
    const data = `<BySquareXmlDocuments xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <Username></Username>
  <Password></Password>
  <Documents>
    <Pay xsi:type="Pay" xmlns="http://www.bysquare.com/bysquare"> 
      <Payments>
      <Payment>
        <BankAccounts>
          <BankAccount>
            <IBAN></IBAN>
          </BankAccount>
        </BankAccounts>
        <VariableSymbol></VariableSymbol>
        <ConstantSymbol></ConstantSymbol>
        <SpecificSymbol></SpecificSymbol>
        <BeneficiaryAddressLine1></BeneficiaryAddressLine1>
        <Amount></Amount>
        <CurrencyCode></CurrencyCode>
        <PaymentNote></PaymentNote>
        <BeneficiaryName></BeneficiaryName>
        <PaymentOptions></PaymentOptions>
      </Payment>
    </Payments> 
    </Pay>
  </Documents>
</BySquareXmlDocuments>`;

    return this.httpClient.post('https://app.bysquare.com/api/generateQR_v2', data, {
      headers: new HttpHeaders({
        'content-type': 'application/xml',
      }),
    });
  }
}
