import { BlockGroupType, SchemaControl } from '@app/schema/schema';
import { ValidatorFn } from '@angular/forms';

export type FormeroQuestionDropdownParams = SchemaControl<number> & {
  options: {
    value: number;
    label: string;
  }[];
};

export class FormeroQuestionDropdown implements SchemaControl<number> {
  static blockType = 'dropdown';
  static uiTitle = 'Zoznam možností';
  static uiType = BlockGroupType.CONTROL;
  static uiOrder = 60;

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
    value: number;
    label: string;
  }[] = [];

  constructor(params?: Partial<FormeroQuestionDropdownParams>) {
    this.fillWithInitData(params);
  }

  getValue(): number {
    return this.value;
  }

  getBlockType(): BlockGroupType {
    return FormeroQuestionDropdown.blockType as BlockGroupType;
  }

  fillWithInitData(params?: Partial<FormeroQuestionDropdownParams>): void {
    this.key = params?.key || '';
    this.order = params?.order || 0;
    this.value = params?.value || -1;
    this.label = params?.label || 'Nadpis otázky';
    this.description = params?.description || 'Popis otázky';
    this.validators = params?.validators || [];
    this.required = params?.required || false;
    this.quickInfo = params?.quickInfo || false;
    this.shared = params?.shared || false;
    this.layout = params?.layout || {};
    this.options = params?.options || [
      {
        value: 0,
        label: 'Odpoveď 1',
      },
      {
        value: 1,
        label: 'Odpoveď 2',
      },
    ];
  }
}
