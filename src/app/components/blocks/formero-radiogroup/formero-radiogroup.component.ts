import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormeroQuestionRadiogroup } from '../../../Question';

@Component({
  selector: 'app-formero-radiogroup',
  templateUrl: './formero-radiogroup.component.html',
  styleUrls: ['./formero-radiogroup.component.scss'],
})
export class FormeroRadiogroupComponent implements OnInit {
  @Input() props: FormeroQuestionRadiogroup;
  @Input() form: UntypedFormGroup;
  @Input() displayMessages: boolean;

  constructor() {}

  ngOnInit(): void {}
}
