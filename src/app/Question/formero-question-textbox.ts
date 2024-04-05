import { QuestionSchemaBlock } from './formero-question';

export class FormeroQuestionTextbox extends QuestionSchemaBlock<string> {
  blockType = 'textbox';
  uiTitle: 'Krátka textová odpoveď';
  type: string;

  constructor(params) {
    super(params);
    this.type = params.type || 'text';
  }
}
