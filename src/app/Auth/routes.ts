import { Routes } from '@angular/router';
import { unauthenticatedGuard } from '@auth/guards/authenticated.guard';
import { LoginPageComponent } from '@auth/components/pages/login-page/login-page.component';
import { ForgotPasswordPageComponent } from '@auth/components/pages/forgot-password-page/forgot-password-page.component';
import { RegisterPageComponent } from '@auth/components/pages/register-page/register-page.component';
import { ResetPasswordComponent } from '@auth/components/pages/reset-password/reset-password.component';

export const AUTH_ROUTES: Routes = [
  {
    path: 'log-in',
    component: LoginPageComponent,
    canMatch: [unauthenticatedGuard],
  },
  {
    path: 'forgot-pwd',
    component: ForgotPasswordPageComponent,
    canMatch: [unauthenticatedGuard],
  },
  {
    // todo: after reload http://localhost:4200/register-new (with F5) -> 404 Not found
    path: 'register-new',
    component: RegisterPageComponent,
    canMatch: [unauthenticatedGuard],
  },
  {
    path: 'password-reset/:token',
    component: ResetPasswordComponent,
    canMatch: [unauthenticatedGuard],
  },
];
