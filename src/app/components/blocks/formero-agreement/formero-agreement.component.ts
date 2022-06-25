import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormeroQuestionAgreementCheckbox } from '../../../Question';

@Component({
  selector: 'app-formero-agreement',
  templateUrl: './formero-agreement.component.html',
  styleUrls: ['./formero-agreement.component.scss'],
})
export class FormeroAgreementComponent implements OnInit {
  @Input() props: FormeroQuestionAgreementCheckbox;
  @Input() form: UntypedFormGroup;
  @Input() displayMessages: boolean;

  constructor() {}

  ngOnInit(): void {}
}
