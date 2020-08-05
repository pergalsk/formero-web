export class FormeroBlock {
  key: string;
  content: string;
  order: number;

  constructor(
    options: {
      key?: string;
      content?: string;
      order?: number;
    } = {}
  ) {
    this.key = options.key || '';
    this.content = options.content || '';
    this.order = options.order || 0;
  }
}
