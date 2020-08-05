import { FormeroQuestion } from './formero-question';

export class FormeroQuestionRadiogroup extends FormeroQuestion<string> {
  blockType = 'radiogroup';
  options: { value: string; label: string }[];

  constructor(params) {
    super(params);
    this.options = params.options || [];
  }
}
