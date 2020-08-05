import { FormeroQuestion } from './formero-question';

export class FormeroQuestionAgreementCheckbox extends FormeroQuestion<string> {
  blockType = 'agreement';
  options: string;

  constructor(params) {
    super(params);
    this.options = params.options || '';
  }
}
