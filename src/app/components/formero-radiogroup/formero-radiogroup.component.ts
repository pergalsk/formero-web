import { Component, Input, OnInit } from '@angular/core';
import { FormeroQuestionRadiogroup } from '../../Question/formero-question-radiogroup';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-formero-radiogroup',
  templateUrl: './formero-radiogroup.component.html',
  styleUrls: ['./formero-radiogroup.component.scss'],
})
export class FormeroRadiogroupComponent implements OnInit {
  @Input() props: FormeroQuestionRadiogroup;
  @Input() form: FormGroup;

  constructor() {}

  ngOnInit(): void {}
}
