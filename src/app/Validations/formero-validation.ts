import { ValidatorFn } from '@angular/forms';
import { SchemaValidator } from '@app/schema/schema';

export type FormeroValidationParams = SchemaValidator;

export class FormeroValidation implements SchemaValidator {
  static blockType = 'validation';
  static uiTitle = 'Validácia';

  key: string;
  order: number;
  layout?: any;
  validators: ValidatorFn[];

  constructor(params?: FormeroValidationParams) {
    this.fillWithInitData(params);
  }

  getBlockType(): string {
    return FormeroValidation.blockType;
  }

  fillWithInitData(params?: FormeroValidationParams): void {
    this.key = params?.key || '';
    this.order = params?.order || 0;
    this.validators = params?.validators || [];
    this.layout = params?.layout || {};
  }
}
