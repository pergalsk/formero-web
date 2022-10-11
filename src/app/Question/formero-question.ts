import { ValidatorFn } from '@angular/forms';

export class FormeroQuestion<T> {
  key: string;
  blockType: string;
  value?: T;
  label?: string;
  description?: string;
  validators?: ValidatorFn[];
  required?: boolean;
  order?: number;
  quickInfo?: boolean;
  shared?: boolean;
  layout?: any;

  constructor(
    options: {
      key?: string;
      blockType?: string;
      value?: T;
      label?: string;
      description?: string;
      validators?: ValidatorFn[];
      required?: boolean;
      order?: number;
      quickInfo?: boolean;
      shared?: boolean;
      layout?: any;
    } = {}
  ) {
    this.key = options.key || '';
    this.blockType = options.blockType || '';
    this.value = options.value;
    this.label = options.label || '';
    this.description = options.description || '';
    this.validators = options.validators || [];
    this.required = options.required || false;
    this.order = options.order || 0;
    this.quickInfo = options.quickInfo || false;
    this.shared = options.shared || false;
    this.layout = options.layout || {};
  }
}
