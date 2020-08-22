import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';

import { ValidatorsService } from './validators.service';
import { UtilsService } from './utils.service';
import { FormeroBlockTitle, FormeroBlockText, FormTextBlocksSet } from '../Blocks';
import {
  FormeroQuestionTextbox,
  FormeroQuestionTextarea,
  FormeroQuestionDropdown,
  FormeroQuestionRadiogroup,
  FormeroQuestionAgreementCheckbox,
  FormQuestionBlocksSet,
} from '../Question';

export interface FormBlocksSet {
  title: string;
  successInfo: string;
  validators: Validators[];
  options: { [param: string]: any };
  blocks: (FormQuestionBlocksSet | FormTextBlocksSet)[];
}

export interface RawValidatorInfo {
  type: string;
  params: Array<any> | null;
}

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(
    private validatorsService: ValidatorsService,
    private utilsService: UtilsService,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) {}

  loadFormSchema(): Observable<any> {
    return this.httpClient.get('assets/dbt-2020.form-schema.json').pipe(delay(1500));
  }

  getQuestions() {
    return this.loadFormSchema().pipe(
      map((formSchema) => this.processFormSchema(formSchema)),
      catchError(this.handleError('Formulár sa nepodarilo načítať.'))
    );
  }

  processFormSchema(formSchema) {
    if (formSchema && formSchema.validators && formSchema.validators.length) {
      formSchema.validators = formSchema.validators
        .map((rawValidator) => this.processRawValidators(rawValidator))
        .filter((validator) => validator); // filter falsy values
    }

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
        .map((rawValidatorInfo) => this.processRawValidators(rawValidatorInfo))
        .filter((validator) => validator); // filter falsy values
    }

    const blockTypeMap = new Map<string, any>([
      ['title', FormeroBlockTitle],
      ['blocktext', FormeroBlockText],
      ['textbox', FormeroQuestionTextbox],
      ['textarea', FormeroQuestionTextarea],
      ['radiogroup', FormeroQuestionRadiogroup],
      ['dropdown', FormeroQuestionDropdown],
      ['agreement', FormeroQuestionAgreementCheckbox],
    ]);

    const constructorFnName = blockTypeMap.get(rawFormBlock.type);
    return constructorFnName ? new constructorFnName({ ...rawFormBlock }) : null;
  }

  processRawValidators(rawValidator: RawValidatorInfo): ValidatorFn | null {
    let validatorFn;

    switch (rawValidator.type) {
      case 'required':
        validatorFn = Validators.required;
        break;

      case 'maxLength':
        validatorFn = Validators.maxLength(rawValidator.params[0]);
        break;

      case 'minLength':
        validatorFn = Validators.minLength(rawValidator.params[0]);
        break;

      case 'email':
        validatorFn = Validators.email;
        break;

      case 'checkedValidator':
        validatorFn = this.validatorsService.checkedValidator;
        break;

      case 'atLeastOneContactValidator':
        validatorFn = this.validatorsService.atLeastOneContactValidator;
        break;

      default:
        validatorFn = null;
    }

    return validatorFn;
  }

  buildForm(questions: FormBlocksSet): FormGroup {
    const controlsConfig = {};
    const options = { validators: questions.validators }; // form global validators

    for (const question of questions.blocks) {
      if (!(question instanceof FormeroBlockText || question instanceof FormeroBlockTitle)) {
        const { key, value, validators } = question;
        controlsConfig[key] = [value, validators];
      }
    }

    return this.formBuilder.group(controlsConfig, options);
  }

  // Get keys of shared form fields.
  // todo: private, static ?
  extractSharedControlKeys(formBlocks): string[] {
    return formBlocks && formBlocks.length
      ? formBlocks.filter((formBlock) => formBlock.shared).map((formBlock) => formBlock.key)
      : [];
  }

  extractQuickInfoControlKeys(formBlocks): string[] {
    return formBlocks && formBlocks.length
      ? formBlocks.filter((formBlock) => formBlock.quickInfo).map((formBlock) => formBlock.key)
      : [];
  }

  submitAnswers(answersData): Observable<any> {
    return this.httpClient
      .post('http://localhost:4004/formero/public/form?XDEBUG_SESSION_START=PHPSTORM', answersData)
      .pipe(catchError(this.handleError('Pri odosielaní nastala chyba.')));
  }

  handleError(message: string) {
    return (error: HttpErrorResponse) => {
      if (error.error instanceof ErrorEvent) {
        console.error('Client side error occurred:' + error.error.message);
      } else {
        console.error('Backend side error occurred with status:' + error.status);
        console.error('Error body:' + error.error);
      }

      return throwError(message);
    };
  }

  generateQR() {
    // <Username>test@test.test</Username>
    // <Password>test@test.test</Password>

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
