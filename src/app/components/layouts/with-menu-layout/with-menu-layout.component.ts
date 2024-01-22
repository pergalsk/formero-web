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
          <li>
            <a [routerLink]="['/forms']" [routerLinkActive]="['active-link']">Formuláre</a>
          </li>
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
  `,
})
export class WithMenuLayoutComponent {}
