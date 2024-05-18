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
import { NgIf } from '@angular/common';
import { ValidatorsService } from '@services/validators.service';

@Component({
  selector: 'app-formero-textarea',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, FormeroFieldMessagesComponent],
  template: `
    <ng-container [formGroup]="form">
      <div class="label-title" [class.required]="props.required" [textContent]="props.label"></div>
      <div class="label-description" [textContent]="props.description"></div>

      <textarea
        [formControlName]="props.key"
        [id]="props.key"
        [name]="props.key"
        [placeholder]="props.label"
      ></textarea>
    </ng-container>

    <app-formero-field-messages
      *ngIf="displayMessages"
      [control]="form.controls[props.key]"
      [label]="props.label"
    ></app-formero-field-messages>
  `,
})
export class FormeroTextareaComponent implements OnInit, OnChanges, OnDestroy {
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
