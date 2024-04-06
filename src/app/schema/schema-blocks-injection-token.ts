import { InjectionToken } from '@angular/core';
import { FormeroValidation } from '@app/Validations';
import { FormeroBlockText, FormeroBlockTitle } from '@app/Blocks';
import {
  FormeroQuestionAgreementCheckbox,
  FormeroQuestionCheckgroup,
  FormeroQuestionDropdown,
  FormeroQuestionRadiogroup,
  FormeroQuestionTextarea,
  FormeroQuestionTextbox,
} from '@app/Question';

export const SCHEMA_BLOCKS = new InjectionToken<
  | FormeroQuestionAgreementCheckbox
  | FormeroQuestionCheckgroup
  | FormeroQuestionDropdown
  | FormeroQuestionRadiogroup
  | FormeroQuestionTextarea
  | FormeroQuestionTextbox
  | FormeroBlockText
  | FormeroBlockTitle
  | FormeroValidation
>('SchemaBlocks');

export const schemaBlocksProviders = [
  { provide: SCHEMA_BLOCKS, useValue: FormeroQuestionAgreementCheckbox, multi: true },
  { provide: SCHEMA_BLOCKS, useValue: FormeroQuestionCheckgroup, multi: true },
  { provide: SCHEMA_BLOCKS, useValue: FormeroQuestionDropdown, multi: true },
  { provide: SCHEMA_BLOCKS, useValue: FormeroQuestionRadiogroup, multi: true },
  { provide: SCHEMA_BLOCKS, useValue: FormeroQuestionTextarea, multi: true },
  { provide: SCHEMA_BLOCKS, useValue: FormeroQuestionTextbox, multi: true },
  { provide: SCHEMA_BLOCKS, useValue: FormeroBlockText, multi: true },
  { provide: SCHEMA_BLOCKS, useValue: FormeroBlockTitle, multi: true },
  { provide: SCHEMA_BLOCKS, useValue: FormeroValidation, multi: true },
];
