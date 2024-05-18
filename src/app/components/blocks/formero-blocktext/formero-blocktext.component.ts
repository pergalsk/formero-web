import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-formero-blocktext',
  standalone: true,
  template: `<p [innerHTML]="props.content"></p>`,
})
export class FormeroBlocktextComponent {
  @Input() props: any;
}
