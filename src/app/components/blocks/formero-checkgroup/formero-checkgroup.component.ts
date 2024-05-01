import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UtilsService } from '@services/utils.service';
import { FormeroQuestionCheckgroup } from '@app/Question';
import { FormeroFieldMessagesComponent } from '@app/components';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-formero-checkgroup',
  template: `
    <ng-container [formGroup]="form">
      <div class="label-title" [textContent]="props.label" [class.required]="props.required"></div>
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

    <app-formero-field-messages
      *ngIf="displayMessages"
      [control]="control"
      [label]="props.label"
    ></app-formero-field-messages>
  `,
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgFor, FormeroFieldMessagesComponent],
})
export class FormeroCheckgroupComponent implements OnInit, OnDestroy {
  @Input() props: FormeroQuestionCheckgroup;
  @Input() form: UntypedFormGroup;
  @Input() displayMessages: boolean;

  control: UntypedFormArray;
  displayAllChecked: boolean;
  allChecked: boolean;
  optionsNum: number;
  valueChangeSubscription: Subscription;

  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {
    const { isAllTruthy } = this.utilsService;

    this.control = this.form.controls[this.props.key] as UntypedFormArray;
    this.optionsNum =
      (this.props && Array.isArray(this.props.options) && this.props.options.length) || 0;
    this.displayAllChecked = this.optionsNum > 3;

    if (this.displayAllChecked) {
      // Initial all-checkbox set-up.
      this.allChecked = isAllTruthy(this.control.value);
      // Observing control value change.
      this.valueChangeSubscription = this.control.valueChanges
        .pipe(map(isAllTruthy))
        .subscribe((allChecked) => {
          this.allChecked = allChecked;
        });
    }
  }

  ngOnDestroy(): void {
    this.valueChangeSubscription?.unsubscribe();
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
}
