import { BlockGroupType, SchemaText } from '@app/schema/schema';

export class FormeroBlockText implements SchemaText {
  static blockType = 'blocktext';
  static uiTitle = 'Odstavec';
  static uiType = BlockGroupType.TEXT;
  static uiOrder = 20;

  key: string;
  order: number;
  content: string;
  layout?: any;

  constructor(params?: SchemaText) {
    this.fillWithInitData(params);
  }

  getBlockType(): BlockGroupType {
    return FormeroBlockText.blockType as BlockGroupType;
  }

  fillWithInitData(params?: SchemaText): void {
    this.key = params?.key || '';
    this.order = params?.order || 0;
    this.content = params?.content || 'Blok textu';
    this.layout = params?.layout || { panel: 1 };
  }
}
