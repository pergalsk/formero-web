import { QuestionSchemaBlock } from './formero-question';

export class FormeroQuestionTextbox extends QuestionSchemaBlock<string> {
  static blockType = 'textbox';
  static uiTitle = 'Krátka textová odpoveď';

  type: string;

  constructor(params) {
    super(params);
    this.type = params.type || 'text';
  }

  getBlockType() {
    return FormeroQuestionTextbox.blockType;
  }
}
