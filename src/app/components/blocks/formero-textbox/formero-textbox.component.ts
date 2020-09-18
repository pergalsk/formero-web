import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormeroQuestionTextbox } from '../../../Question';

@Component({
  selector: 'app-formero-textbox',
  templateUrl: './formero-textbox.component.html',
  styleUrls: ['./formero-textbox.component.scss'],
})
export class FormeroTextboxComponent implements OnInit {
  @Input() props: FormeroQuestionTextbox;
  @Input() form: FormGroup;
  @Input() displayMessages: boolean;

  constructor() {}

  ngOnInit(): void {}
}
