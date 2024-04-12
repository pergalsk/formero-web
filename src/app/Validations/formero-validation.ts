import { ValidatorFn } from '@angular/forms';
import { BlockGroupType, SchemaValidator } from '@app/schema/schema';

export type FormeroValidationParams = SchemaValidator;

export class FormeroValidation implements SchemaValidator {
  static blockType = 'validation';
  static uiTitle = 'Validácia';
  static uiType = BlockGroupType.MISC;
  static uiOrder = 90;

  key: string;
  order: number;
  layout?: any;
  validators: ValidatorFn[];

  constructor(params?: FormeroValidationParams) {
    this.fillWithInitData(params);
  }

  getBlockType(): BlockGroupType {
    return FormeroValidation.blockType as BlockGroupType;
  }

  fillWithInitData(params?: FormeroValidationParams): void {
    this.key = params?.key || '';
    this.order = params?.order || 0;
    this.validators = params?.validators || [];
    this.layout = params?.layout || {};
  }
}
