import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { authenticatedGuard } from '@app/guards/authenticated.guard';
import { PlainLayoutComponent } from '@components/layouts/plain-layout/plain-layout.component';
import { WithMenuLayoutComponent } from '@components/layouts/with-menu-layout/with-menu-layout.component';
import { AboutPageComponent } from '@components/pages/about-page/about-page.component';
import { FormPageComponent } from '@components/pages/form-page/form-page.component';
import { FormsPageComponent } from '@components/pages/forms-page/forms-page.component';
import { HomePageComponent } from '@components/pages/home-page/home-page.component';
import { RegisterPageComponent } from '@components/pages/register-page/register-page.component';
import { LoginPageComponent } from '@components/pages/login-page/login-page.component';
import { ForgotPasswordPageComponent } from '@components/pages/forgot-password-page/forgot-password-page.component';
import { ResetPasswordComponent } from '@components/pages/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: WithMenuLayoutComponent,
    children: [
      { path: 'about', component: AboutPageComponent },
      {
        path: 'forms',
        component: FormsPageComponent,
        canMatch: [authenticatedGuard],
      },
      { path: 'form/:id', component: FormPageComponent },
      { path: '', component: HomePageComponent },
    ],
  },
  {
    path: '',
    component: PlainLayoutComponent,
    children: [
      { path: 'log-in', component: LoginPageComponent },

      // todo: after reload http://localhost:4200/register-new (with F5) -> 404 Not found
      { path: 'register-new', component: RegisterPageComponent },
      { path: 'forgot-pwd', component: ForgotPasswordPageComponent },
      { path: 'password-reset/:token', component: ResetPasswordComponent },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
