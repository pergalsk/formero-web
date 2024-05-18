import {
  Component,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormeroFieldMessagesComponent } from '@app/components';
import { NgFor, NgIf } from '@angular/common';
import { ValidatorsService } from '@services/validators.service';

@Component({
  selector: 'app-formero-radiogroup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor, NgIf, FormeroFieldMessagesComponent],
  template: `
    <ng-container [formGroup]="form">
      <div class="label-title" [textContent]="props.label" [class.required]="required"></div>
      <div class="label-description" [textContent]="props.description"></div>

      <div class="input-box" [class.ng-invalid]="form.controls[props.key]?.invalid">
        <label
          class="radio-label"
          *ngFor="let option of props.options; index as i"
          [attr.for]="props.key + '_' + i"
        >
          <input
            type="radio"
            [formControlName]="props.key"
            [value]="option.value"
            [id]="props.key + '_' + i"
          />
          <span>{{ option.label }}</span>
        </label>
      </div>
    </ng-container>

    <app-formero-field-messages
      *ngIf="displayMessages"
      [control]="form.controls[props.key]"
      [label]="props.label"
    />
  `,
})
export class FormeroRadiogroupComponent implements OnInit, OnChanges, OnDestroy {
  @Input() props: any;
  @Input() form: FormGroup;
  @Input() displayMessages: boolean;

  formBuilder = inject(FormBuilder);
  validatorsService = inject(ValidatorsService);

  required = false;

  ngOnInit(): void {
    this.connectControl();
    this.setRequired();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (Object.values(changes).every(({ firstChange }) => firstChange)) {
      return;
    }
    this.connectControl();
    this.setRequired();
  }

  ngOnDestroy(): void {
    this.disconnectControl();
  }

  connectControl(): void {
    this.form.addControl(this.props.key, this.createControl(this.props));
  }

  disconnectControl(): void {
    this.form.removeControl(this.props.key);
  }

  setRequired(): void {
    this.required = this.validatorsService.hasRequiredValidators(this.props.validators);
  }

  createControl(props: any): FormControl<number> {
    const { value, validators } = props;
    return this.formBuilder.control(
      { value: value ?? null, disabled: false },
      this.validatorsService.processRawValidators(validators),
    );
  }
}
