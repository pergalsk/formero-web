import { ValidatorFn } from '@angular/forms';

export type SchemaBlock = any;

export type SchemaBlockBase = {
  // blockType?: string; // as static
  // uiTitle?: string; // as static
  // uiType?: number; // as static
  // uiOrder?: number; // as static

  key: string;
  order: number;
  getBlockType: () => BlockGroupType;
  layout?: any;
};

export type SchemaControl<T> = SchemaBlockBase & {
  value: T;
  quickInfo: boolean;
  shared: boolean;
  label?: string;
  description?: string;
  validators?: ValidatorFn[];
  required?: boolean;
  getValue: () => T;
  fillWithInitData: (params: SchemaControl<T>) => void;
};

export type SchemaText = SchemaBlockBase & {
  content: string;
  fillWithInitData: (params: SchemaText) => void;
};

export type SchemaValidator = SchemaBlockBase & {
  validators: ValidatorFn[];
  fillWithInitData: (params: SchemaValidator) => void;
};

export enum BlockGroupType {
  TEXT = 'text',
  CONTROL = 'control',
  MISC = 'misc',
}
