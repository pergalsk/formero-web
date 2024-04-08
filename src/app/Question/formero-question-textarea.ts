import { QuestionSchemaBlock } from './formero-question';
import { ValidatorFn } from '@angular/forms';

export class FormeroQuestionTextarea extends QuestionSchemaBlock<string> {
  static blockType = 'textarea';
  static uiTitle = 'Dlhšia textová odpoveď';

  constructor(params: {
    key: string;
    order?: number;
    value?: string;
    label?: string;
    description?: string;
    validators?: ValidatorFn[];
    required?: boolean;
    quickInfo?: boolean;
    shared?: boolean;
    layout?: any;
  }) {
    super(params);
  }

  getBlockType() {
    return FormeroQuestionTextarea.blockType;
  }
}
