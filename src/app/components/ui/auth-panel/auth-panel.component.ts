import { ChangeDetectionStrategy, Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '@auth/services/auth.service';
import { toSignalWithError } from '@auth/utils/toSignalWithError';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth-panel',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <span>
      @if (user.value() != null) {
        {{ user.value().name }}
        <small>
          {{ user.value().email }}
          @if (!user.value().email_verified_at) {
            <span>(neoverené)</span>
          }
        </small>
        |
        <a [routerLink]="[]" (click)="logout()">Odhlásiť</a>
      } @else {
        <a [routerLink]="['/log-in']">Prihlásiť</a> |
        <a [routerLink]="['/register-new']">Registrovať</a>
      }
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPanelComponent implements OnDestroy {
  router = inject(Router);
  authService: AuthService = inject(AuthService);

  user = toSignalWithError<User>(this.authService.getUser());

  subscription$: Subscription;

  logout() {
    this.authService.logoutUser().subscribe(() => {
      this.router.navigate(['/log-in']);
    });
  }

  ngOnDestroy() {
    this.subscription$?.unsubscribe();
  }
}
