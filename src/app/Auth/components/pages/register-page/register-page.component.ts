import { ChangeDetectionStrategy, Component, inject, OnDestroy, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ValidatorsService } from '@services/validators.service';
import { AuthService, RegisterUserRequest, User } from '@auth/services/auth.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, JsonPipe],
  template: `
    <h1>Registrácia</h1>

    <form class="auth" [formGroup]="formData" (ngSubmit)="registerSubmit()">
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
        <label for="name">Meno *</label>
        <input id="name" type="text" autocomplete="name" formControlName="name" />
        @if (showValidations && formData.controls.name.errors?.required) {
          <div style="color: red">Pole je povinné</div>
        }
        @if (showValidations && serverErrors()?.name) {
          @for (errorText of serverErrors().name; track $index) {
            <div style="color: red">{{ errorText }}</div>
          }
        }
      </p>
      <p>
        <button type="submit">Registrovať</button>
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
export class RegisterPageComponent implements OnDestroy {
  router: Router = inject(Router);
  fb: FormBuilder = inject(FormBuilder);
  authService: AuthService = inject(AuthService);
  validatorsService: ValidatorsService = inject(ValidatorsService);

  subscription$: Subscription;

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
      name: ['', [Validators.required, Validators.maxLength(255)]],
    },
    {
      validators: this.validatorsService.groupEqualValidator(['password', 'password_confirmation']),
      updateOn: 'change',
    },
  );

  registerSubmit() {
    this.showValidations = true;
    this.serverErrors.set({});

    if (!this.formData.valid) {
      return;
    }

    const data: RegisterUserRequest = this.formData.getRawValue();

    this.subscription$ = this.authService.registerUser(data).subscribe({
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
