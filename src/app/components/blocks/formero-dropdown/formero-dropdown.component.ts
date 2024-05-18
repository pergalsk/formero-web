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
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { FormeroFieldMessagesComponent } from '@app/components';
import { NgFor, NgIf } from '@angular/common';
import { ValidatorsService } from '@services/validators.service';

@Component({
  selector: 'app-formero-dropdown',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor, NgIf, FormeroFieldMessagesComponent],
  template: `
    <ng-container [formGroup]="form">
      <div class="label-title" [textContent]="props.label" [class.required]="required"></div>
      <div class="label-description" [textContent]="props.description"></div>

      <select [formControlName]="props.key" [id]="props.key" [name]="props.key">
        <option *ngFor="let option of props.options" [value]="option.value">
          {{ option.label }}
        </option>
      </select>
    </ng-container>

    <app-formero-field-messages
      *ngIf="displayMessages"
      [control]="form.controls[props.key]"
      [label]="props.label"
    ></app-formero-field-messages>
  `,
})
export class FormeroDropdownComponent implements OnInit, OnChanges, OnDestroy {
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

  createControl(props: any): FormControl<string> {
    const { value, validators } = props;
    return this.formBuilder.control(
      { value: value || '', disabled: false },
      this.validatorsService.processRawValidators(validators),
    );
  }
}
