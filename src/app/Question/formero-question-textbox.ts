import { BlockGroupType, SchemaControl } from '@app/schema/schema';
import { ValidatorFn } from '@angular/forms';

export type FormeroQuestionTextboxParams = SchemaControl<string> & { type: string };

export class FormeroQuestionTextbox implements SchemaControl<string> {
  static blockType = 'textbox';
  static uiTitle = 'Krátka textová odpoveď';
  static uiType = BlockGroupType.CONTROL;
  static uiOrder = 30;

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

  type: string;

  constructor(params?: Partial<FormeroQuestionTextboxParams>) {
    this.fillWithInitData(params);
  }

  getValue(): string {
    return this.value;
  }

  getBlockType(): BlockGroupType {
    return FormeroQuestionTextbox.blockType as BlockGroupType;
  }

  fillWithInitData(params?: Partial<FormeroQuestionTextboxParams>): void {
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
    this.type = params?.type || 'text';
  }
}
