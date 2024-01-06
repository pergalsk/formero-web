import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthPanelComponent } from '@components/ui/auth-panel/auth-panel.component';
import { NgxColorSchemesComponent } from 'ngx-color-schemes';

@Component({
  selector: 'app-with-menu-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    AuthPanelComponent,
    NgxColorSchemesComponent,
  ],
  template: `
    <div class="content">
      <div class="flx-row flx-end">
        <app-auth-panel></app-auth-panel>
        <ngx-color-schemes size="28"></ngx-color-schemes>
      </div>

      <header>
        <h1>Formero APP</h1>

        <nav>
          <ul>
            <li>
              <a
                [routerLink]="['']"
                [routerLinkActive]="['active-link']"
                [routerLinkActiveOptions]="{ exact: true }"
                >Domov</a
              >
            </li>
            <li>Formuláre:</li>
            <ul>
              @for (id of formIds; track $index) {
                <li>
                  <a [routerLink]="['/form', id]" [routerLinkActive]="['active-link']">
                    Formulár id = {{ id }}
                  </a>
                </li>
              }
            </ul>
            <li>
              <a [routerLink]="['/about']" [routerLinkActive]="['active-link']">O aplikácii</a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <router-outlet></router-outlet>
      </main>

      <footer>
        <hr />
        <span>Copyright (c) 2022 | -pg-</span>
      </footer>
    </div>
  `,
})
export class WithMenuLayoutComponent {
  formIds: number[] = [13405, 16498, 999];
}
