import {
  Component,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormeroFieldMessagesComponent } from '@app/components';
import { NgIf } from '@angular/common';
import { ValidatorsService } from '@services/validators.service';

@Component({
  selector: 'app-formero-validation',
  standalone: true,
  imports: [NgIf, FormeroFieldMessagesComponent],
  template: `
    <app-formero-field-messages *ngIf="displayMessages" [control]="form" [boxed]="true" />
  `,
})
export class FormeroValidationComponent implements OnInit, OnChanges, OnDestroy {
  @Input() props: any;
  @Input() form: FormGroup;
  @Input() displayMessages: boolean;

  validatorsService = inject(ValidatorsService);

  ngOnInit(): void {
    this.connectControl();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (Object.values(changes).every(({ firstChange }) => firstChange)) {
      return;
    }
    this.connectControl();
  }

  ngOnDestroy(): void {
    this.disconnectControl();
  }

  connectControl(): void {
    this.form.addValidators(this.validatorsService.processRawValidators(this.props?.validators));
    this.form.updateValueAndValidity();
  }

  disconnectControl(): void {
    this.form.removeValidators(this.props.key);
    this.form.updateValueAndValidity();
  }
}
