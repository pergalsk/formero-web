import { BlockGroupType, SchemaControl } from '@app/schema/schema';
import { ValidatorFn } from '@angular/forms';

export type FormeroQuestionAgreementCheckboxParams = SchemaControl<boolean> & { options: string };

export class FormeroQuestionAgreementCheckbox implements SchemaControl<boolean> {
  static blockType = 'agreement';
  static uiTitle = 'Odsúhlasenie';
  static uiType = BlockGroupType.CONTROL;
  static uiOrder = 80;

  key: string;
  order: number;
  layout?: any;
  value: boolean;
  quickInfo: boolean;
  shared: boolean;
  label?: string;
  description?: string;
  validators?: ValidatorFn[];
  required?: boolean;

  options: string;

  constructor(params?: Partial<FormeroQuestionAgreementCheckboxParams>) {
    this.fillWithInitData(params);
  }

  getValue(): boolean {
    return this.value;
  }

  getBlockType(): BlockGroupType {
    return FormeroQuestionAgreementCheckbox.blockType as BlockGroupType;
  }

  fillWithInitData(params?: Partial<FormeroQuestionAgreementCheckboxParams>): void {
    this.key = params?.key || '';
    this.order = params?.order || 0;
    this.value = params?.value || false;
    this.label = params?.label || 'Nadpis otázky';
    this.description = params?.description || 'Popis otázky';
    this.validators = params?.validators || [];
    this.required = params?.required || false;
    this.quickInfo = params?.quickInfo || false;
    this.shared = params?.shared || false;
    this.layout = params?.layout || {};
    this.options = params?.options || 'Text na odsúhlasenie';
  }
}
