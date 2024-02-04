import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormeroQuestionAgreementCheckbox } from '../../../Question';
import { FormeroFieldMessagesComponent } from '../../common/formero-field-messages/formero-field-messages.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-formero-agreement',
    templateUrl: './formero-agreement.component.html',
    styleUrls: ['./formero-agreement.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf,
        FormeroFieldMessagesComponent,
    ],
})
export class FormeroAgreementComponent implements OnInit {
  @Input() props: FormeroQuestionAgreementCheckbox;
  @Input() form: UntypedFormGroup;
  @Input() displayMessages: boolean;

  constructor() {}

  ngOnInit(): void {}
}
