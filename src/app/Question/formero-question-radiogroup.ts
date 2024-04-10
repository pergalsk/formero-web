import { BlockGroupType, SchemaControl } from '@app/schema/schema';
import { ValidatorFn } from '@angular/forms';

export type FormeroQuestionRadiogroupParams = SchemaControl<string> & {
  options: {
    value: string;
    label: string;
  }[];
};

export class FormeroQuestionRadiogroup implements SchemaControl<string> {
  static blockType = 'radiogroup';
  static uiTitle = 'Jedna voľba z viacerých';
  static uiType = BlockGroupType.CONTROL;
  static uiOrder = 70;
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

  constructor(params?: FormeroQuestionRadiogroupParams) {
    this.fillWithInitData(params);
  }

  getBlockType(): BlockGroupType {
    return FormeroQuestionRadiogroup.blockType as BlockGroupType;
  }

  fillWithInitData(params?: FormeroQuestionRadiogroupParams): void {
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
        value: 'val1',
        label: 'Odpoveď 1',
      },
      {
        value: 'val2',
        label: 'Odpoveď 2',
      },
    ];
  }
}
