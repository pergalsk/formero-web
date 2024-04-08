import { ValidatorFn } from '@angular/forms';

export class FormeroValidation {
  static blockType = 'validation';
  static uiTitle = 'Validácia';

  key: string;
  validators: ValidatorFn[];
  order?: number;
  layout: any;

  constructor(options: { key?: string; validators?: ValidatorFn[]; order?: number; layout?: any }) {
    this.key = options.key || '';
    this.validators = options.validators || [];
    this.order = options.order || 0;
    this.layout = options.layout || {};
  }

  getBlockType() {
    return FormeroValidation.blockType;
  }
}
