import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormeroValidation } from '../../../Validations';

@Component({
  selector: 'app-formero-validation',
  templateUrl: './formero-validation.component.html',
  styleUrls: ['./formero-validation.component.scss'],
})
export class FormeroValidationComponent implements OnInit {
  @Input() props: FormeroValidation;
  @Input() form: FormGroup;
  @Input() displayMessages: boolean;

  constructor() {}

  ngOnInit(): void {}
}
