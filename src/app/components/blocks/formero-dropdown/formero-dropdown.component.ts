import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormeroQuestionDropdown } from '../../../Question';

@Component({
  selector: 'app-formero-dropdown',
  templateUrl: './formero-dropdown.component.html',
  styleUrls: ['./formero-dropdown.component.scss'],
})
export class FormeroDropdownComponent implements OnInit {
  @Input() props: FormeroQuestionDropdown;
  @Input() form: UntypedFormGroup;
  @Input() displayMessages: boolean;

  constructor() {}

  ngOnInit(): void {}
}
