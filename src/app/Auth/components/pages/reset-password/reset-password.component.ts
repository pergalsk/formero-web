import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService, ResetPasswordRequest } from '@auth/services/auth.service';
import { ValidatorsService } from '@services/validators.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  template: `
    <h1>Obnovenie hesla</h1>

    <form class="auth" [formGroup]="formData" (ngSubmit)="resetPasswordSubmit()">
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
        <input
          id="password"
          type="password"
          autocomplete="new-password"
          formControlName="password"
        />
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
        <label for="password_confirm">Potvrdenie hesla *</label>
        <input
          id="password_confirm"
          type="password"
          autocomplete="new-password"
          formControlName="password_confirmation"
        />
        @if (showValidations && formData.controls.password_confirmation.errors?.required) {
          <div style="color: red">Pole je povinné</div>
        }
        @if (showValidations && formData.errors?.groupEqual) {
          <div style="color: red">Heslo musí byť rovnaké</div>
        }
      </p>
      <p>
        <button type="submit">Zmeniť heslo</button>
      </p>
      <p>
        <small>
          <a [routerLink]="['/']">Domov</a> |
          <a [routerLink]="['/log-in']">Prihlásiť</a>
        </small>
      </p>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  fb: FormBuilder = inject(FormBuilder);
  authService: AuthService = inject(AuthService);
  validatorsService: ValidatorsService = inject(ValidatorsService);

  subscription$: Subscription;

  token = '';
  email = '';
  showValidations = false;
  serverErrors = signal<{ [key: string]: string[] }>({});

  formData = this.fb.group(
    {
      email: [
        '',
        [
          Validators.required,
          Validators.maxLength(255),
          this.validatorsService.emailPatternValidator,
        ],
      ],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
    },
    {
      validators: this.validatorsService.groupEqualValidator(['password', 'password_confirmation']),
      updateOn: 'change',
    },
  );

  ngOnInit(): void {
    this.token = this.route.snapshot?.params?.token;
    this.email = this.route.snapshot?.queryParams?.email;

    if (this.email) {
      this.formData.patchValue({ email: this.email });
    }
  }

  resetPasswordSubmit(): void {
    this.showValidations = true;
    this.serverErrors.set({});

    if (!this.formData.valid) {
      return;
    }

    const dataWithToken: ResetPasswordRequest = {
      ...this.formData.getRawValue(),
      token: this.token,
    };

    this.subscription$ = this.authService.resetPassword(dataWithToken).subscribe({
      next: (data: any) => this.navigateToLogin(data?.status || null),
      error: (errData: HttpErrorResponse) => this.serverErrors.set(errData?.error?.errors),
    });
  }

  navigateToLogin(message?: string): void {
    this.router.navigate(['/log-in'], { state: { message } });
  }

  ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }
}
