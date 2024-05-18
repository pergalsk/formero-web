import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UntypedFormBuilder, FormGroup } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ValidatorsService } from './validators.service';
import { UtilsService } from './utils.service';
import { FormValidationBlocksSet } from '../Validations';
import { FormTextBlocksSet } from '../Blocks';
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
      map((schema) => ({ ...schema, blocks: this.processBlocks(schema.blocks) })),
      catchError(this.handleError('Formulár sa nepodarilo načítať.')),
    );
  }

  loadFormSchema(schemaId: number): Observable<any> {
    return this.httpClient.get<any>(`/api/schema/${schemaId}`);
  }

  loadAllFormSchemas(): Observable<SchemasListItem[]> {
    return this.httpClient.get<SchemasListItem[]>('/api/schema');
  }

  processBlocks(blocks) {
    if (!Array.isArray(blocks)) {
      return [];
    }

    return blocks
      .filter((block) => this.schemaBlocks.find((item): boolean => block.type === item.type))
      .sort(this.utilsService.sortByOrderProp);
  }

  initEmptyForm(): FormGroup {
    return this.formBuilder.group(
      {},
      {
        validators: [],
        updateOn: 'change',
      },
    );
  }

  extractFormInitValue(formBlocks): { [key: string]: any } {
    const withValue = ['textbox', 'textarea', 'dropdown', 'radiogroup', 'checkgroup', 'agreement'];

    const initValue: { [key: string]: any } = {};

    for (const formBlock of formBlocks) {
      if (withValue.includes(formBlock.type)) {
        if (formBlock.type === 'checkgroup') {
          initValue[formBlock.key] = formBlock?.options.map((option) => option.value) || [];
        } else {
          initValue[formBlock.key] = formBlock.value;
        }
      }
    }

    return initValue;
  }

  keysByProp(propName: string = '', formBlocks): string[] {
    return formBlocks?.length
      ? formBlocks.filter((formBlock) => !!formBlock[propName]).map((formBlock) => formBlock.key)
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
