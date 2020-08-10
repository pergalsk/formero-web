import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormeroQuestionRadiogroup } from '../../../Question';

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
