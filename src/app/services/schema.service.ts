import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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
import { FormeroQuestionCheckgroup, FormQuestionBlocksSet } from '../Question';
import { SCHEMA_BLOCKS } from '@app/schema/schema-blocks-injection-token';

export interface FormBlocksSet {
  id: number;
  title: string;
  successInfo: string;
  options: { [param: string]: any };
  blocks: (FormQuestionBlocksSet | FormTextBlocksSet | FormValidationBlocksSet)[];
  calculationsId: number | null;
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
  httpClient: HttpClient = inject(HttpClient);
  formBuilder: UntypedFormBuilder = inject(UntypedFormBuilder);
  utilsService: UtilsService = inject(UtilsService);
  validatorsService: ValidatorsService = inject(ValidatorsService);
  schemaBlocks: any = inject(SCHEMA_BLOCKS);

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
    if (!Array.isArray(formSchema.blocks) || !formSchema.blocks.length) {
      return formSchema;
    }

    // Process form blocks
    formSchema.blocks = formSchema.blocks
      .map((rawFormBlock) => this.processRawFormBlock(rawFormBlock))
      .filter((formBlock) => formBlock) // filter falsy values
      .sort(this.utilsService.sortByOrderProp);

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

    const constructorFnName = this.schemaBlocks.find((item): boolean => {
      return rawFormBlock.type === item.blockType;
    });
    return constructorFnName ? new constructorFnName({ ...rawFormBlock }) : null;
  }

  buildForm(formBlockSet: FormBlocksSet): UntypedFormGroup {
    const controlsConfig: { [key: string]: any } = {};

    const options: AbstractControlOptions = {
      validators: [],
      updateOn: 'change',
    };

    // todo: refactor to switch-case
    for (const block of formBlockSet.blocks) {
      if (block instanceof FormeroValidation) {
        // todo: HANDLE MULTIPLE VALIDATORS OF THE SAME KIND

        options.validators = [...block.validators]; // set as global form validators
      } else if (block instanceof FormeroQuestionCheckgroup) {
        const { key, options: opt, validators } = block;
        const controls: UntypedFormControl[] = opt.map(
          (option) =>
            new UntypedFormControl({
              value: option.value || false,
              disabled: option.disabled || false,
            }),
        );
        controlsConfig[key] = new UntypedFormArray(controls, validators);
      } else if (block instanceof FormeroBlockText || block instanceof FormeroBlockTitle) {
      } else {
        const { key, value, validators } = block;
        controlsConfig[key] = [value, validators];
      }
    }

    return this.formBuilder.group(controlsConfig, options);
  }

  extractFormInitValue(formBlocks): { [key: string]: any } {
    const initValue: { [key: string]: any } = {};

    for (const formBlock of formBlocks) {
      if (typeof formBlock.getValue === 'function') {
        initValue[formBlock.key] = formBlock.getValue();
      }
    }

    return initValue;
  }

  // Get keys of shared form fields.
  keysByProp(propName: string = '', formBlocks): string[] {
    return formBlocks?.length
      ? formBlocks.filter((formBlock) => formBlock.shared).map((formBlock) => formBlock[propName])
      : [];
  }

  extractCheckGroupsKeys(formBlockSet: FormBlocksSet): CheckGroupsKeys {
    // todo: handle null values
    return formBlockSet.blocks.reduce(
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

  prepareSubmitData(batchFormData: any[], fromBlockSet: FormBlocksSet): any {
    // generate checkgroup keys for all checkgroup blocks
    const checkGroupsKeys: CheckGroupsKeys = this.extractCheckGroupsKeys(fromBlockSet);

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
