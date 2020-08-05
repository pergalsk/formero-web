import { Validators } from '@angular/forms';

export class FormeroQuestion<T> {
  key: string;
  blockType: string;
  value?: T;
  label?: string;
  description?: string;
  validators?: Validators[];
  order?: number;
  quickInfo?: boolean;
  shared?: boolean;

  constructor(
    options: {
      key?: string;
      blockType?: string;
      value?: T;
      label?: string;
      description?: string;
      validators?: Validators[];
      order?: number;
      quickInfo?: boolean;
      shared?: boolean;
    } = {}
  ) {
    this.key = options.key || '';
    this.blockType = options.blockType || '';
    this.value = options.value;
    this.label = options.label || '';
    this.description = options.description || '';
    this.validators = options.validators || [];
    this.order = options.order || 0;
    this.quickInfo = options.quickInfo || false;
    this.shared = options.shared || false;
  }
}
