import { QuestionSchemaBlock } from './formero-question';

export class FormeroQuestionAgreementCheckbox extends QuestionSchemaBlock<string> {
  static blockType = 'agreement';
  static uiTitle = 'Konfirmácia';

  options: string;

  constructor(params) {
    super(params);
    this.options = params.options || '';
  }

  getBlockType() {
    return FormeroQuestionAgreementCheckbox.blockType;
  }

  fillWIthInitData() {
    this.key = '';
    this.order = 0;
    this.value = this.label = 'Nadpis otázky';
    this.description = 'Popis otázky';
    this.validators = [];
    this.required = false;
    this.quickInfo = false;
    this.shared = false;
    this.layout = {};
    this.options = 'Text na odsúhlasenie';
  }
}
