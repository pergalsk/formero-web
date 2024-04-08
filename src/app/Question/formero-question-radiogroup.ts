import { QuestionSchemaBlock } from './formero-question';

export class FormeroQuestionRadiogroup extends QuestionSchemaBlock<string> {
  static blockType = 'radiogroup';
  static uiTitle = 'Jedna voľba z viacerých';

  options: { value: string; label: string }[];

  constructor(params) {
    super(params);
    this.options = params.options || [];
  }

  getBlockType() {
    return FormeroQuestionRadiogroup.blockType;
  }
}
