import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormeroQuestionTextarea } from '../../../Question';

@Component({
  selector: 'app-formero-textarea',
  templateUrl: './formero-textarea.component.html',
  styleUrls: ['./formero-textarea.component.scss'],
})
export class FormeroTextareaComponent implements OnInit {
  @Input() props: FormeroQuestionTextarea;
  @Input() form: FormGroup;

  constructor() {}

  ngOnInit(): void {}
}
