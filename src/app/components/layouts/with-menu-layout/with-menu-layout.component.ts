import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthPanelComponent } from '@components/ui/auth-panel/auth-panel.component';
import { AuthService } from '@auth/services/auth.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-with-menu-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, AuthPanelComponent, AsyncPipe],
  template: `
    <div class="content dashboard-layout">
      @if (isAuthenticated$ | async) {
        <header>
          <nav>
            <app-auth-panel></app-auth-panel>
          </nav>
        </header>
      }

      <main>
        <router-outlet></router-outlet>
      </main>

      <footer>
        <span>Copyright (c) 2022 | -pg-</span>
      </footer>
    </div>
  `,
})
export class WithMenuLayoutComponent {
  isAuthenticated$: Observable<boolean> = inject(AuthService).isAuthenticated();
}
