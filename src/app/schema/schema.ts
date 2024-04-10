import { ValidatorFn } from '@angular/forms';

export type SchemaBlockBase = {
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
