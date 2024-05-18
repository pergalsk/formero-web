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
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormArray,
  FormControl,
  FormBuilder,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UtilsService } from '@services/utils.service';
import { FormeroFieldMessagesComponent } from '@app/components';
import { NgIf, NgFor } from '@angular/common';
import { ValidatorsService } from '@services/validators.service';

@Component({
  selector: 'app-formero-checkgroup',
  template: `
    <ng-container [formGroup]="form">
      <div class="label-title" [textContent]="props.label" [class.required]="required"></div>
      <div class="label-description" [textContent]="props.description"></div>

      <div class="input-box" [class.ng-invalid]="form.controls[props.key]?.invalid">
        @if (displayAllChecked) {
          <label for="all-checked">
            <input
              type="checkbox"
              id="all-checked"
              [(ngModel)]="allChecked"
              [ngModelOptions]="{ standalone: true }"
              (change)="onChangeAll()"
            />
            <span>Všetky</span>
          </label>
          <hr />
        }

        @for (option of props.options; track i; let i = $index) {
          <label
            class="checkbox-label"
            [formArrayName]="props.key"
            [attr.for]="props.key + '_' + i"
          >
            <input type="checkbox" [formControlName]="i" [id]="props.key + '_' + i" />
            <span>{{ option.label }}</span>
          </label>
        }
      </div>
    </ng-container>

    <app-formero-field-messages *ngIf="displayMessages" [control]="control" [label]="props.label" />
  `,
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgFor, FormeroFieldMessagesComponent],
})
export class FormeroCheckgroupComponent implements OnInit, OnChanges, OnDestroy {
  @Input() props: any;
  @Input() form: FormGroup;
  @Input() displayMessages: boolean;

  formBuilder = inject(FormBuilder);
  utilsService = inject(UtilsService);
  validatorsService = inject(ValidatorsService);

  control: FormArray;
  displayAllChecked: boolean;
  allChecked: boolean;
  valueChangeSubscription: Subscription;
  required = false;

  ngOnInit(): void {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (Object.values(changes).every(({ firstChange }) => firstChange)) {
      return;
    }
    this.init();
  }

  ngOnDestroy(): void {
    this.valueChangeSubscription?.unsubscribe();
    this.disconnectControl();
  }

  init() {
    this.control = this.createControl(this.props);
    this.connectControl(this.props, this.control);
    this.setRequired(this.props);

    this.setAllChecked();
  }

  setAllChecked(): void {
    const { isAllTruthy } = this.utilsService;
    const { options } = this.props;

    const optionsNum: number = (Array.isArray(options) && options.length) || 0;
    this.displayAllChecked = optionsNum > 3;

    if (!this.displayAllChecked) {
      return;
    }

    // Initial all-checkbox set-up.
    this.allChecked = isAllTruthy(this.control.value);

    // Observing control value change.
    this.valueChangeSubscription = this.control.valueChanges
      .pipe(map(isAllTruthy))
      .subscribe((allChecked: boolean) => {
        this.allChecked = allChecked;
      });
  }

  onChangeAll() {
    // Change only enabled values and leave untouched disabled ones.
    const value: boolean[] = [...this.control.getRawValue()];
    for (let i = 0; i < this.control.length; i++) {
      if (this.control.at(i).enabled) {
        value[i] = this.allChecked;
      }
    }
    this.control.setValue(value);

    // This is non-UI update so we must mark as dirty and touched manually.
    this.control.markAsDirty();
    this.control.markAsTouched();
  }

  connectControl(props: any, control?: FormControl | FormArray): void {
    this.form.addControl(props.key, control || this.createControl(props));
  }

  disconnectControl(): void {
    this.form.removeControl(this.props.key);
  }

  setRequired(props: any): void {
    this.required = this.validatorsService.hasRequiredValidators(props.validators);
  }

  createControl(props: any): FormArray<FormControl<boolean>> {
    const { options, validators } = props;

    const controls: FormControl[] = options.map((option) =>
      this.formBuilder.control({
        value: option.value || false,
        disabled: option.disabled || false,
      }),
    );

    return this.formBuilder.array(
      controls,
      this.validatorsService.processRawValidators(validators),
    );
  }
}
