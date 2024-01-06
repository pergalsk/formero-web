import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h1>Obnoviť heslo</h1>
    <form class="auth">
      <p>
        <small>
          <a [routerLink]="['/']">Domov</a> | <a [routerLink]="['/log-in']">Prihlásiť</a> |
          <a [routerLink]="['/register-new']">Registrovať</a>
        </small>
      </p>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordPageComponent {}
