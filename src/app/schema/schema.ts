export class SchemaBlock {
  static blockType = 'genericblock';
  static uiTitle = 'Generic Block';

  key: string;
  order?: number;

  protected constructor(params: { key: string; order?: number }) {
    this.key = params.key || '';
    this.order = params.order || 0;
  }

  getBlockType() {
    return SchemaBlock.blockType;
  }
}

export interface SchemaBlockLayout {
  layout?: any;
}
