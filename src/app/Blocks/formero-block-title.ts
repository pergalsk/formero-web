import { TextSchemaBlock } from './formero-block';

export class FormeroBlockTitle extends TextSchemaBlock {
  static blockType = 'title';
  static uiTitle = 'Titulok';

  constructor(params) {
    super(params);
  }

  getBlockType() {
    return FormeroBlockTitle.blockType;
  }

  fillWIthInitData() {
    this.key = '';
    this.order = 0;
    this.content = 'Titulok';
  }
}
