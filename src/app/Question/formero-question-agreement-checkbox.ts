import { QuestionSchemaBlock } from './formero-question';

export class FormeroQuestionAgreementCheckbox extends QuestionSchemaBlock<string> {
  static blockType = 'agreement';
  static uiTitle = 'Konfirmácia';
  options: string;

  constructor(params) {
    super(params);
    this.options = params.options || '';
  }
}
