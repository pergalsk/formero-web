import { QuestionSchemaBlock } from './formero-question';

export class FormeroQuestionRadiogroup extends QuestionSchemaBlock<string> {
  blockType = 'radiogroup';
  uiTitle: 'Jedna voľba z viacerých';
  options: { value: string; label: string }[];

  constructor(params) {
    super(params);
    this.options = params.options || [];
  }
}
