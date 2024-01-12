import { ChangeDetectionStrategy, Component, inject, OnDestroy, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService, LoginUserRequest, User } from '@services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, JsonPipe],
  template: `
    <h1>Prihlásenie</h1>

    <form class="auth" [formGroup]="formData" (ngSubmit)="loginSubmit()">
      @if (message) {
        <p>{{ message }}</p>
      }
      <p>
        <label for="email">Email *</label>
        <input id="email" type="email" autocomplete="email" formControlName="email" />
        @if (showValidations && formData.controls.email.errors?.required) {
          <div style="color: red">Pole je povinné</div>
        }
        @if (showValidations && formData.controls.email.errors?.emailPattern) {
          <div style="color: red">Emailová adresa nie je správna</div>
        }
        @if (showValidations && serverErrors()?.email) {
          @for (errorText of serverErrors().email; track $index) {
            <div style="color: red">{{ errorText }}</div>
          }
        }
      </p>
      <p>
        <label for="password">Heslo *</label>
        <input id="password" type="password" autocomplete="password" formControlName="password" />
        @if (showValidations && formData.controls.password.errors?.required) {
          <div style="color: red">Pole je povinné</div>
        }
        @if (showValidations && serverErrors()?.password) {
          @for (errorText of serverErrors().password; track $index) {
            <div style="color: red">{{ errorText }}</div>
          }
        }
      </p>
      <p>
        <label for="remember">
          <input id="remember" type="checkbox" formControlName="remember" />
          <span>Trvalé prihlásenie</span>
        </label>
        @if (showValidations && serverErrors()?.remember) {
          @for (errorText of serverErrors().remember; track $index) {
            <div style="color: red">{{ errorText }}</div>
          }
        }
      </p>
      <p>
        <button type="submit">Prihlásiť</button>
      </p>
      <p>
        <small>
          <a [routerLink]="['/']">Domov</a> |
          <a [routerLink]="['/forgot-pwd']">Zabudnuté heslo?</a>
          | <a [routerLink]="['/register-new']">Registrovať</a>
        </small>
      </p>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnDestroy {
  router: Router = inject(Router);
  fb: FormBuilder = inject(FormBuilder);
  authService: AuthService = inject(AuthService);

  subscription$: Subscription;

  showValidations = false;
  message = this.router.getCurrentNavigation()?.extras?.state?.message || '';
  serverErrors = signal<{ [key: string]: string[] }>({});

  formData = this.fb.group(
    {
      email: ['', [Validators.required]],
      password: ['', Validators.required],
      remember: [false],
    },
    { updateOn: 'change' },
  );

  loginSubmit(): void {
    this.showValidations = true;
    this.serverErrors.set({});

    if (!this.formData.valid) {
      return;
    }

    const data: LoginUserRequest = this.formData.getRawValue();

    this.subscription$ = this.authService.loginUser(data).subscribe({
      next: (value: User) => this.navigateToHome(),
      error: (errData: HttpErrorResponse) => this.serverErrors.set(errData?.error?.errors),
    });
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }
}
