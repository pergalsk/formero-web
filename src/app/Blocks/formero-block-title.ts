import { BlockGroupType, SchemaText } from '@app/schema/schema';

export class FormeroBlockTitle implements SchemaText {
  static blockType = 'title';
  static uiTitle = 'Nadpis sekcie';
  static uiType = BlockGroupType.TEXT;
  static uiOrder = 10;

  key: string;
  order: number;
  content: string;
  layout?: any;

  constructor(params?: SchemaText) {
    this.fillWithInitData(params);
  }

  getBlockType(): BlockGroupType {
    return FormeroBlockTitle.blockType as BlockGroupType;
  }

  fillWithInitData(params?: SchemaText): void {
    this.key = params?.key || '';
    this.order = params?.order || 0;
    this.content = params?.content || 'Text nadpisu';
    this.layout = params?.layout || { panel: 1 };
  }
}
