import { ChangeDetectionStrategy, Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuItem, SharedModule } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { NgxColorSchemesComponent } from 'ngx-color-schemes';
import { toSignalWithError } from '@auth/utils/toSignalWithError';
import { AuthService, User } from '@auth/services/auth.service';

@Component({
  selector: 'app-auth-panel',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    AvatarModule,
    InputTextModule,
    MenubarModule,
    MenuModule,
    SharedModule,
    // NgxColorSchemesComponent,
  ],
  template: `
    <p-menubar [model]="mainMenu">
      <ng-template pTemplate="start">
        <div class="flx-row flx-ai-center">
          <img
            alt="Formero Logo"
            src="../../../../assets/formero-logo.png"
            width="40"
            height="40"
          />
          <div class="app-title bold">Formero</div>
        </div>
      </ng-template>
      <ng-template pTemplate="end">
        <div class="flx-row flx-ai-center">
          <!--<ngx-color-schemes size="28"></ngx-color-schemes>-->
          @if (user.value() != null) {
            {{ user.value().name }}
            <small>
              {{ user.value().email }}
              @if (!user.value().email_verified_at) {
                <br /><span>(neoverené)</span>
              }
            </small>
          }
          <div>
            <p-avatar
              icon="pi pi-user"
              shape="circle"
              size="normal"
              [style]="{ 'background-color': '#2196E3' }"
              (mouseenter)="menu.show($event)"
            >
            </p-avatar>
            <p-menu #menu [model]="profileMenu" [popup]="true"></p-menu>
          </div>
        </div>
      </ng-template>
    </p-menubar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPanelComponent implements OnDestroy {
  router: Router = inject(Router);
  authService: AuthService = inject(AuthService);

  user = toSignalWithError<User>(this.authService.getUser());

  subscription$: Subscription;

  mainMenu: MenuItem[] = [
    {
      label: 'Formuláre',
      icon: 'pi pi-fw pi-file',
      items: [
        {
          label: 'Zoznam formulárov',
          icon: 'pi pi-fw pi-bars',
          routerLink: ['/forms'],
        },
        {
          label: 'Pridať nový formulár',
          icon: 'pi pi-fw pi-plus',
          routerLink: ['/forms/create'],
        },
      ],
    },
    {
      label: 'Používatelia',
      icon: 'pi pi-fw pi-user',
    },
  ];

  profileMenu: MenuItem[] = [
    {
      label: 'Odhlásiť',
      icon: 'pi pi-fw pi-power-off',
      command: () => {
        this.logout();
      },
    },
  ];

  logout() {
    this.authService.logoutUser().subscribe(() => {
      this.router.navigate(['/log-in']);
    });
  }

  ngOnDestroy() {
    this.subscription$?.unsubscribe();
  }
}
