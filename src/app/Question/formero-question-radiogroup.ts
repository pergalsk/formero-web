import { BlockGroupType, SchemaControl } from '@app/schema/schema';
import { ValidatorFn } from '@angular/forms';

export type FormeroQuestionRadiogroupParams = SchemaControl<number> & {
  options: {
    key: string;
    disabled: boolean;
    value: string;
    label: string;
  }[];
};

export class FormeroQuestionRadiogroup implements SchemaControl<number> {
  static blockType = 'radiogroup';
  static uiTitle = 'Jedna voľba z viacerých';
  static uiType = BlockGroupType.CONTROL;
  static uiOrder = 70;

  key: string;
  order: number;
  layout?: any;
  value: number;
  quickInfo: boolean;
  shared: boolean;
  label?: string;
  description?: string;
  validators?: ValidatorFn[];
  required?: boolean;

  options: {
    key: string;
    disabled: boolean;
    value: string;
    label: string;
  }[] = [];

  constructor(params?: FormeroQuestionRadiogroupParams) {
    this.fillWithInitData(params);
  }

  getValue(): number {
    return this.value;
  }

  getBlockType(): BlockGroupType {
    return FormeroQuestionRadiogroup.blockType as BlockGroupType;
  }

  fillWithInitData(params?: FormeroQuestionRadiogroupParams): void {
    this.key = params?.key || '';
    this.order = params?.order || 0;
    this.value = params?.value || 0;
    this.label = params?.label || 'Nadpis otázky';
    this.description = params?.description || 'Popis otázky';
    this.validators = params?.validators || [];
    this.required = params?.required || false;
    this.quickInfo = params?.quickInfo || false;
    this.shared = params?.shared || false;
    this.layout = params?.layout || {};
    this.options = params?.options || [
      {
        key: 'key1',
        disabled: false,
        value: 'val1',
        label: 'Odpoveď 1',
      },
      {
        key: 'key2',
        disabled: false,
        value: 'val2',
        label: 'Odpoveď 2',
      },
    ];
  }
}
