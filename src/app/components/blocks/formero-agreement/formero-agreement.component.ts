import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormeroQuestionAgreementCheckbox } from '@app/Question';
import { FormeroFieldMessagesComponent } from '@app/components';

@Component({
  selector: 'app-formero-agreement',
  templateUrl: './formero-agreement.component.html',
  styleUrls: ['./formero-agreement.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, FormeroFieldMessagesComponent],
})
export class FormeroAgreementComponent {
  @Input() props: FormeroQuestionAgreementCheckbox;
  @Input() form: UntypedFormGroup;
  @Input() displayMessages: boolean;
}
