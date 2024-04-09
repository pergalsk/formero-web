import { SchemaControl } from '@app/schema/schema';
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

  getBlockType(): string {
    return FormeroQuestionRadiogroup.blockType;
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
