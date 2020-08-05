import { Component, Input, OnInit } from '@angular/core';
import { FormeroQuestionDropdown } from '../../Question/formero-question-dropdown';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-formero-dropdown',
  templateUrl: './formero-dropdown.component.html',
  styleUrls: ['./formero-dropdown.component.scss'],
})
export class FormeroDropdownComponent implements OnInit {
  @Input() props: FormeroQuestionDropdown;
  @Input() form: FormGroup;

  constructor() {}

  ngOnInit(): void {}
}
