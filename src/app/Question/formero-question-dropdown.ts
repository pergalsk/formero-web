import { FormeroQuestion } from './formero-question';

export class FormeroQuestionDropdown extends FormeroQuestion<string> {
  blockType = 'dropdown';
  options: { value: string; label: string }[] = [];

  constructor(params) {
    super(params);
    this.options = params.options || [];
  }
}
