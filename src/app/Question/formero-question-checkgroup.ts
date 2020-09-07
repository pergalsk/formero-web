import { FormeroQuestion } from './formero-question';

export class FormeroQuestionCheckgroup extends FormeroQuestion<string> {
  blockType = 'checkgroup';
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
