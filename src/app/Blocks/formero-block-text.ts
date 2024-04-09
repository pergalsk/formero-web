import { SchemaText } from '@app/schema/schema';

export class FormeroBlockText implements SchemaText {
  static blockType = 'blocktext';
  static uiTitle = 'Blok textu';

  key: string;
  order: number;
  content: string;
  layout?: any;

  constructor(params?: SchemaText) {
    this.fillWithInitData(params);
  }

  getBlockType(): string {
    return FormeroBlockText.blockType;
  }

  fillWithInitData(params?: SchemaText): void {
    this.key = params?.key || '';
    this.order = params?.order || 0;
    this.content = params?.content || 'Blok textu';
    this.layout = params?.layout || { panel: 1 };
  }
}
