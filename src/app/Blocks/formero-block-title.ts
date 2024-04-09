import { SchemaText } from '@app/schema/schema';

export class FormeroBlockTitle implements SchemaText {
  static blockType = 'title';
  static uiTitle = 'Nadpis';

  key: string;
  order: number;
  content: string;
  layout?: any;

  constructor(params?: SchemaText) {
    this.fillWithInitData(params);
  }

  getBlockType(): string {
    return FormeroBlockTitle.blockType;
  }

  fillWithInitData(params?: SchemaText): void {
    this.key = params?.key || '';
    this.order = params?.order || 0;
    this.content = params?.content || 'Text nadpisu';
    this.layout = params?.layout || { panel: 1 };
  }
}
