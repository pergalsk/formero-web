import { FormeroQuestion } from './formero-question';

export class FormeroQuestionTextarea extends FormeroQuestion<string> {
  blockType = 'textarea';

  constructor(params: {} = {}) {
    super(params);
  }
}
