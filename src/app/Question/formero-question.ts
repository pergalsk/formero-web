import { ValidatorFn } from '@angular/forms';
import { SchemaBlock, SchemaBlockLayout } from '@app/schema/schema';

export class QuestionSchemaBlock<T> extends SchemaBlock implements SchemaBlockLayout {
  static blockType = 'genericquestionblock';
  static uiTitle = 'Generic Question Block';
  value?: T;
  label?: string;
  description?: string;
  validators?: ValidatorFn[];
  required?: boolean;
  quickInfo?: boolean;
  shared?: boolean;
  layout?: any;

  protected constructor(params: {
    key: string;
    order?: number;
    value?: T;
    label?: string;
    description?: string;
    validators?: ValidatorFn[];
    required?: boolean;
    quickInfo?: boolean;
    shared?: boolean;
    layout?: any;
  }) {
    super(params);

    this.value = params.value;
    this.label = params.label || '';
    this.description = params.description || '';
    this.validators = params.validators || [];
    this.required = params.required || false;
    this.quickInfo = params.quickInfo || false;
    this.shared = params.shared || false;
    this.layout = params.layout || {};
  }
}
