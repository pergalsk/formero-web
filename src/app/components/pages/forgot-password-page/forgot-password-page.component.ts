import { ChangeDetectionStrategy, Component, inject, OnDestroy, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService, ForgotPasswordRequest } from '@services/auth.service';
import { ValidatorsService } from '@services/validators.service';

@Component({
  selector: 'app-forgot-password-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  template: `
    <h1>Obnoviť heslo</h1>

    <form class="auth" [formGroup]="formData" (ngSubmit)="forgotPasswordSubmit()">
      <p>
        Zabudli ste heslo? Žiadny problém. Stačí nám oznámiť svoju e-mailovú adresu a my vám pošleme
        odkaz na obnovenie hesla, ktorý vám umožní zvoliť si nové.
      </p>
      @if (status()) {
        <p>{{ status() }}</p>
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
        <button type="submit">Poslať link pre obnovenie hesla</button>
      </p>
      <p>
        <small>
          <a [routerLink]="['/']">Domov</a> | <a [routerLink]="['/log-in']">Prihlásiť</a> |
          <a [routerLink]="['/register-new']">Registrovať</a>
        </small>
      </p>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordPageComponent implements OnDestroy {
  fb: FormBuilder = inject(FormBuilder);
  authService: AuthService = inject(AuthService);
  validatorsService: ValidatorsService = inject(ValidatorsService);

  subscription$: Subscription;

  showValidations = false;
  serverErrors = signal<{ [key: string]: string[] }>({});
  status = signal<string>('');

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
    },
    {
      updateOn: 'change',
    },
  );

  forgotPasswordSubmit(): void {
    this.showValidations = true;
    this.serverErrors.set({});

    if (!this.formData.valid) {
      return;
    }

    const data: ForgotPasswordRequest = this.formData.getRawValue();

    this.subscription$ = this.authService.forgotPassword(data).subscribe({
      next: (value) => this.status.set(value?.status),
      error: (errData: HttpErrorResponse) => this.serverErrors.set(errData?.error?.errors),
    });
  }

  ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }
}
