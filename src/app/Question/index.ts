import { FormeroQuestionTextbox } from './formero-question-textbox';
import { FormeroQuestionTextarea } from './formero-question-textarea';
import { FormeroQuestionDropdown } from './formero-question-dropdown';
import { FormeroQuestionRadiogroup } from './formero-question-radiogroup';
import { FormeroQuestionCheckgroup } from './formero-question-checkgroup';
import { FormeroQuestionAgreementCheckbox } from './formero-question-agreement-checkbox';

export {
  FormeroQuestionTextbox,
  FormeroQuestionTextarea,
  FormeroQuestionDropdown,
  FormeroQuestionRadiogroup,
  FormeroQuestionCheckgroup,
  FormeroQuestionAgreementCheckbox,
};

export type FormQuestionBlocksSet =
  | FormeroQuestionTextbox
  | FormeroQuestionTextarea
  | FormeroQuestionDropdown
  | FormeroQuestionRadiogroup
  | FormeroQuestionCheckgroup
  | FormeroQuestionAgreementCheckbox;
