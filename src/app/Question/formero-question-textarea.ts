import { ValidatorFn } from '@angular/forms';
import { BlockGroupType, SchemaControl } from '@app/schema/schema';

export type FormeroQuestionTextareaParams = SchemaControl<string>;

export class FormeroQuestionTextarea implements SchemaControl<string> {
  static blockType = 'textarea';
  static uiTitle = 'Dlhšia textová odpoveď';
  static uiType = BlockGroupType.CONTROL;
  static uiOrder = 40;

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

  constructor(params?: FormeroQuestionTextareaParams) {
    this.fillWithInitData(params);
  }

  getBlockType(): BlockGroupType {
    return FormeroQuestionTextarea.blockType as BlockGroupType;
  }

  fillWithInitData(params?: FormeroQuestionTextareaParams): void {
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
  }
}
