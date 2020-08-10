import { FormeroQuestionTextbox } from './formero-question-textbox';
import { FormeroQuestionTextarea } from './formero-question-textarea';
import { FormeroQuestionDropdown } from './formero-question-dropdown';
import { FormeroQuestionRadiogroup } from './formero-question-radiogroup';
import { FormeroQuestionAgreementCheckbox } from './formero-question-agreement-checkbox';

export {
  FormeroQuestionTextbox,
  FormeroQuestionTextarea,
  FormeroQuestionDropdown,
  FormeroQuestionRadiogroup,
  FormeroQuestionAgreementCheckbox,
};

export type FormQuestionBlocksSet =
  | FormeroQuestionTextbox
  | FormeroQuestionTextarea
  | FormeroQuestionDropdown
  | FormeroQuestionRadiogroup
  | FormeroQuestionAgreementCheckbox;
