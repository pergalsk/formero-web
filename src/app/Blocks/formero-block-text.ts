import { TextSchemaBlock } from './formero-block';

export class FormeroBlockText extends TextSchemaBlock {
  static blockType = 'blocktext';
  static uiTitle = 'Blok textu';

  constructor(params) {
    super(params);
  }

  getBlockType() {
    return FormeroBlockText.blockType;
  }

  fillWIthInitData() {
    this.key = '';
    this.order = 0;
    this.content = 'Blok textu.';
  }
}
