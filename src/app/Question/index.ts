import { FormeroQuestionTextbox } from './formero-question-textbox';
import { FormeroQuestionTextarea } from './formero-question-textarea';
import { FormeroQuestionDropdown } from './formero-question-dropdown';
import { FormeroQuestionRadiogroup } from './formero-question-radiogroup';
import { FormeroQuestionAgreementCheckbox } from './formero-question-agreement-checkbox';

export { FormeroQuestionTextbox } from './formero-question-textbox';
export { FormeroQuestionTextarea } from './formero-question-textarea';
export { FormeroQuestionDropdown } from './formero-question-dropdown';
export { FormeroQuestionRadiogroup } from './formero-question-radiogroup';
export { FormeroQuestionAgreementCheckbox } from './formero-question-agreement-checkbox';

export type FormQuestionBlocksSet =
  | FormeroQuestionTextbox
  | FormeroQuestionTextarea
  | FormeroQuestionDropdown
  | FormeroQuestionRadiogroup
  | FormeroQuestionAgreementCheckbox;
