import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-forms-page',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <p>Zoznam formulárov:</p>
    <ul>
      @for (id of formIds; track $index) {
        <li>
          <a [routerLink]="['/form', id]" [routerLinkActive]="['active-link']">
            Formulár id = {{ id }}
          </a>
        </li>
      }
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormsPageComponent {
  formIds: number[] = [13405, 16498, 999];
}
