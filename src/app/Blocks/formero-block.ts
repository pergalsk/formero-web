import { SchemaBlock, SchemaBlockLayout } from '@app/schema/schema';

export class TextSchemaBlock extends SchemaBlock implements SchemaBlockLayout {
  static blockType = 'generictextblock';
  static uiTitle = 'Generic Text Block';

  content: string;
  layout?: any;

  protected constructor(params: { key: string; order?: number; content: string; layout?: any }) {
    super(params);

    this.content = params.content || '';
    this.layout = params.layout || {};
  }

  getBlockType() {
    return TextSchemaBlock.blockType;
  }
}
