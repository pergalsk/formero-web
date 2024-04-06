import { inject, Injectable } from '@angular/core';
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
import { catchError, map } from 'rxjs/operators';

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
import { SCHEMA_BLOCKS } from '@app/schema/schema-blocks-injection-token';

export interface FormBlocksSet {
  id: number;
  title: string;
  successInfo: string;
  validators: ValidatorFn | ValidatorFn[] | null;
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

export type SchemasListItem = {
  id: number;
  title: string;
  calculation_id: number;
  user_id: number;
  batch: boolean;
  status: number;
  options: any;
  comment: string;
  hash: string;
  created_at: string;
};

@Injectable({
  providedIn: 'root',
})
export class SchemaService {
  validatorsService: ValidatorsService = inject(ValidatorsService);
  utilsService: UtilsService = inject(UtilsService);
  formBuilder: UntypedFormBuilder = inject(UntypedFormBuilder);
  httpClient: HttpClient = inject(HttpClient);
  schemaBlocks = inject(SCHEMA_BLOCKS);

  getQuestions(schemaId: number) {
    return this.loadFormSchema(schemaId).pipe(
      map((formSchema) => this.processFormSchema(formSchema)),
      catchError(this.handleError('Formulár sa nepodarilo načítať.')),
    );
  }

  loadFormSchema(schemaId: number): Observable<any> {
    return this.httpClient.get<any>(`/api/schema/${schemaId}`);
  }

  loadAllFormSchemas(): Observable<SchemasListItem[]> {
    return this.httpClient.get<SchemasListItem[]>('/api/schema');
  }

  processFormSchema(formSchema) {
    // Process global validators
    if (Array.isArray(formSchema.validators) && formSchema.validators.length) {
      formSchema.validators = formSchema.validators
        .map((rawValidator) => this.validatorsService.processRawValidators(rawValidator))
        .filter((validator: ValidatorFn | null) => validator); // filter falsy values
    }

    // Process form blocks
    if (Array.isArray(formSchema.blocks) && formSchema.blocks.length) {
      formSchema.blocks = formSchema.blocks
        .map((rawFormBlock) => this.processRawFormBlock(rawFormBlock))
        .filter((formBlock) => formBlock) // filter falsy values
        .sort(this.utilsService.sortByOrderProp);
    }

    return formSchema;
  }

  processRawFormBlock(rawFormBlock) {
    if (Array.isArray(rawFormBlock.validators) && rawFormBlock.validators.length) {
      rawFormBlock.required = rawFormBlock.validators.some((rawValidatorInfo: RawValidatorInfo) => {
        // todo: move to separate file
        return [
          'required',
          'groupRequiredValidator',
          'minCheckedValidator',
          'checkedValidator',
        ].includes(rawValidatorInfo.type);
      });

      rawFormBlock.validators = rawFormBlock.validators
        .map((rawValidatorInfo: RawValidatorInfo) =>
          this.validatorsService.processRawValidators(rawValidatorInfo),
        )
        .filter((validator: ValidatorFn | null) => validator); // filter falsy values
    }

    const oo = this.schemaBlocks;
    debugger;

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
    const options: AbstractControlOptions = {
      validators: questions.validators,
      updateOn: 'change',
    }; // form global validators

    // todo: refactor to switch-case
    for (const question of questions.blocks) {
      if (question instanceof FormeroValidation) {
        // todo: HANDLE MULTIPLE VALIDATORS OF THE SAME KIND

        options.validators = [...(options.validators as ValidatorFn[]), ...question.validators]; // set as global form validators
      } else if (question instanceof FormeroQuestionCheckgroup) {
        const { key, options: opt, validators } = question;
        const controls: UntypedFormControl[] = opt.map(
          (option) =>
            new UntypedFormControl({
              value: option.value || false,
              disabled: option.disabled || false,
            }),
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

  extractCheckGroupsKeys(questions: FormBlocksSet): CheckGroupsKeys {
    // todo: handle null values
    return questions.blocks.reduce(
      (result, block) => ({
        ...result,
        ...(block instanceof FormeroQuestionCheckgroup
          ? { [block.key]: block.options.map((option) => option.key) }
          : {}),
      }),
      {},
    );
  }

  replaceCheckGroupValuesWithKeys(formData: any, checkGroupsKeys: CheckGroupsKeys): any {
    const result = { ...formData };
    // todo: change to map (and simplify)
    for (const [key, value] of Object.entries(checkGroupsKeys)) {
      result[key] = result[key].reduce((outputToken, current, index) => {
        return current ? outputToken + (outputToken.length ? '|' : '') + value[index] : outputToken;
      }, '');
    }
    return result;
  }

  submitAnswers(formId, answersData: any[]): Observable<any> {
    const data = {
      entries: answersData,
    };

    return this.httpClient
      .post(`/api/form/${formId}`, data)
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
