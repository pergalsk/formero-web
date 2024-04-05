import { QuestionSchemaBlock } from './formero-question';

export class FormeroQuestionDropdown extends QuestionSchemaBlock<string> {
  blockType = 'dropdown';
  uiTitle = 'Zoznam možností';
  options: { value: string; label: string }[] = [];

  constructor(params) {
    super(params);
    this.options = params.options || [];
  }
}
