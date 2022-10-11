export class FormeroBlock {
  key: string;
  content: string;
  order: number;
  layout: any;

  constructor(
    options: {
      key?: string;
      content?: string;
      order?: number;
      layout?: any;
    } = {}
  ) {
    this.key = options.key || '';
    this.content = options.content || '';
    this.order = options.order || 0;
    this.layout = options.layout || {};
  }
}
