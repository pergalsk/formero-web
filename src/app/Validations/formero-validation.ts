import { ValidatorFn } from '@angular/forms';

export class FormeroValidation {
  blockType: string = 'validation';
  key: string;
  validators: ValidatorFn[];
  order?: number;

  constructor(
    options: {
      key?: string;
      validators?: ValidatorFn[];
      order?: number;
    } = {}
  ) {
    this.key = options.key || '';
    this.validators = options.validators || [];
    this.order = options.order || 0;
  }
}
