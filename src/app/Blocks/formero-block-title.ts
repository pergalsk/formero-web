import { TextSchemaBlock } from './formero-block';

export class FormeroBlockTitle extends TextSchemaBlock {
  blockType = 'title';
  uiTitle = 'Titulok';

  constructor(params) {
    super(params);
  }
}
