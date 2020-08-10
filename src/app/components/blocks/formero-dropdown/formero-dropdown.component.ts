import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormeroQuestionDropdown } from '../../../Question';

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
