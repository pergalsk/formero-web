import { QuestionSchemaBlock } from './formero-question';

export class FormeroQuestionDropdown extends QuestionSchemaBlock<string> {
  static blockType = 'dropdown';
  static uiTitle = 'Zoznam možností';

  options: { value: string; label: string }[] = [];

  constructor(params) {
    super(params);
    this.options = params.options || [];
  }

  getBlockType() {
    return FormeroQuestionDropdown.blockType;
  }
}
