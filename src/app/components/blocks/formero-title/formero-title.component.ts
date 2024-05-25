import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-formero-title',
  standalone: true,
  template: `
    @if (props.label) {
      <h2 class="heading-type-2">
        <span>{{ props.label }}</span>
      </h2>
    }

    @if (props.description) {
      <p [innerHTML]="props.description"></p>
    }
  `,
})
export class FormeroTitleComponent {
  @Input() props: any;
}
