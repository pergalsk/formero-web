import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormeroQuestionAgreementCheckbox } from '../../../Question';

@Component({
  selector: 'app-formero-agreement',
  templateUrl: './formero-agreement.component.html',
  styleUrls: ['./formero-agreement.component.scss'],
})
export class FormeroAgreementComponent implements OnInit {
  @Input() props: FormeroQuestionAgreementCheckbox;
  @Input() form: FormGroup;

  constructor() {}

  ngOnInit(): void {}
}
