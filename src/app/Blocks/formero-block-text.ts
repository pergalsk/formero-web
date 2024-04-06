import { TextSchemaBlock } from './formero-block';

export class FormeroBlockText extends TextSchemaBlock {
  blockType = 'blocktext';
  uiTitle = 'Blok textu';

  constructor(params) {
    super(params);
  }
}
