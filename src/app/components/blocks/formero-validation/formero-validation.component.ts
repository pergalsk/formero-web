import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormeroValidation } from '@app/Validations';
import { FormeroFieldMessagesComponent } from '../../common/formero-field-messages/formero-field-messages.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-formero-validation',
  templateUrl: './formero-validation.component.html',
  styleUrls: ['./formero-validation.component.scss'],
  standalone: true,
  imports: [NgIf, FormeroFieldMessagesComponent],
})
export class FormeroValidationComponent implements OnInit {
  @Input() props: FormeroValidation;
  @Input() form: UntypedFormGroup;
  @Input() displayMessages: boolean;

  constructor() {}

  ngOnInit(): void {}
}
