import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-formero-title',
  standalone: true,
  template: `
    <h2 class="heading-type-1">
      <span>{{ props.content }}</span>
    </h2>
  `,
})
export class FormeroTitleComponent {
  @Input() props: any;
}
