import { TextSchemaBlock } from './formero-block';

export class FormeroBlockTitle extends TextSchemaBlock {
  blockType = 'title';

  constructor(params) {
    super(params);
  }
}
