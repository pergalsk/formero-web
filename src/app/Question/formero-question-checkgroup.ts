import { QuestionSchemaBlock } from './formero-question';

export class FormeroQuestionCheckgroup extends QuestionSchemaBlock<string> {
  blockType = 'checkgroup';
  uiTitle: 'Check group';
  options: {
    key: string;
    value: boolean;
    label: string;
    disabled: boolean;
  }[];

  constructor(params) {
    super(params);
    this.options = params.options || [];
  }
}
