import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-form-create-page',
  standalone: true,
  imports: [InputTextModule],
  template: `
    <div class="page">
      <div class="screen-title">Nový formulár</div>
      <label for="name">Názov</label>
      <input pInputText id="name" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCreatePageComponent {}
