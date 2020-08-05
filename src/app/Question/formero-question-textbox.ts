import { FormeroQuestion } from './formero-question';

export class FormeroQuestionTextbox extends FormeroQuestion<string> {
  blockType = 'textbox';
  type: string;

  constructor(params) {
    super(params);
    this.type = params.type || 'text';
  }
}
