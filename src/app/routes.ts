import { Routes } from '@angular/router';
import { PlainLayoutComponent } from '@components/layouts/plain-layout/plain-layout.component';
import { WithMenuLayoutComponent } from '@components/layouts/with-menu-layout/with-menu-layout.component';
import { DashboardLayoutComponent } from '@components/layout/dashboard-layout/dashboard-layout.component';
import { AboutPageComponent } from '@components/pages/about-page/about-page.component';
import { FormPageComponent } from '@components/pages/form-page/form-page.component';
import { FormsPageComponent } from '@components/pages/forms-page/forms-page.component';
import { HomePageComponent } from '@components/pages/home-page/home-page.component';

import { AUTH_ROUTES } from '@auth/routes';
import { authenticatedGuard } from '@auth/guards/authenticated.guard';

export const routes: Routes = [
  {
    path: '',
    component: WithMenuLayoutComponent,
    children: [
      { path: 'about', component: AboutPageComponent },
      { path: 'form/:id', component: FormPageComponent },
      { path: '', component: HomePageComponent },
    ],
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'forms',
        component: FormsPageComponent,
        canMatch: [authenticatedGuard],
      },
    ],
  },
  {
    path: '',
    component: PlainLayoutComponent,
    children: AUTH_ROUTES,
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
