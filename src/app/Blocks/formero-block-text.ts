import { TextSchemaBlock } from './formero-block';

export class FormeroBlockText extends TextSchemaBlock {
  blockType = 'blocktext';

  constructor(params) {
    super(params);
  }
}
