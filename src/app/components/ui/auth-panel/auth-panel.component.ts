import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '@services/auth.service';
import { toSignalWithError } from '@app/utils/toSignalWithError';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth-panel',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <span>
      @if (user.value()) {
        {{ user.value().name }}
        <small>
          {{ user.value().email }}
          @if (!user.value().email_verified_at) {
            <span>(neoverené)</span>
          }
        </small>
        |
        <a [routerLink]="[]" (click)="logout()">Odhlásiť</a>
      } @else if (user.error()) {
        @if (user.error().status === 401) {
          <a [routerLink]="['/log-in']">Prihlásiť</a> |
          <a [routerLink]="['/register-new']">Registrovať</a>
        } @else {
          Chyba pri načítavaní používateľa.
        }
      } @else {
        Loading...
      }
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPanelComponent {
  router = inject(Router);
  authService: AuthService = inject(AuthService);
  user = toSignalWithError<User>(this.authService.getUser());

  logout() {
    this.authService.logoutUser().subscribe(() => {
      this.router.navigate(['/log-in']);
    });
  }
}
