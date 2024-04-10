import { BlockGroupType, SchemaControl } from '@app/schema/schema';
import { ValidatorFn } from '@angular/forms';

export type FormeroQuestionCheckgroupParams = SchemaControl<string> & {
  options: {
    key: string;
    value: boolean;
    label: string;
    disabled: boolean;
  }[];
};

export class FormeroQuestionCheckgroup implements SchemaControl<string> {
  static blockType = 'checkgroup';
  static uiTitle = 'Viacero možností';
  static uiType = BlockGroupType.CONTROL;
  static uiOrder = 50;

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
    key: string;
    value: boolean;
    label: string;
    disabled: boolean;
  }[];

  constructor(params?: FormeroQuestionCheckgroupParams) {
    this.fillWithInitData(params);
  }

  getBlockType(): BlockGroupType {
    return FormeroQuestionCheckgroup.blockType as BlockGroupType;
  }

  fillWithInitData(params?: FormeroQuestionCheckgroupParams): void {
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
        key: '',
        value: false,
        label: 'Odpoveď 1',
        disabled: false,
      },
      {
        key: '',
        value: false,
        label: 'Odpoveď 2',
        disabled: false,
      },
    ];
  }
}
