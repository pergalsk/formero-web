import { BlockGroupType, SchemaControl } from '@app/schema/schema';
import { ValidatorFn } from '@angular/forms';

export type FormeroQuestionDropdownParams = SchemaControl<string> & {
  options: {
    value: string;
    label: string;
  }[];
};

export class FormeroQuestionDropdown implements SchemaControl<string> {
  static blockType = 'dropdown';
  static uiTitle = 'Zoznam možností';
  static uiType = BlockGroupType.CONTROL;
  static uiOrder = 60;

  key: string;
  order: number;
  layout?: any;
  value: string;
  quickInfo: boolean;
  shared: boolean;
  label?: string;
  description?: string;
  validators?: ValidatorFn[];
  required?: boolean;

  options: {
    value: string;
    label: string;
  }[] = [];

  constructor(params?: FormeroQuestionDropdownParams) {
    this.fillWithInitData(params);
  }

  getBlockType(): BlockGroupType {
    return FormeroQuestionDropdown.blockType as BlockGroupType;
  }

  fillWithInitData(params?: FormeroQuestionDropdownParams): void {
    this.key = params?.key || '';
    this.order = params?.order || 0;
    this.value = params?.value || '';
    this.label = params?.label || 'Nadpis otázky';
    this.description = params?.description || 'Popis otázky';
    this.validators = params?.validators || [];
    this.required = params?.required || false;
    this.quickInfo = params?.quickInfo || false;
    this.shared = params?.shared || false;
    this.layout = params?.layout || {};
    this.options = params?.options || [
      {
        value: '',
        label: 'Odpoveď 1',
      },
      {
        value: '',
        label: 'Odpoveď 2',
      },
    ];
  }
}
