import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormeroQuestionDropdown } from '../../../Question';
import { FormeroFieldMessagesComponent } from '../../common/formero-field-messages/formero-field-messages.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-formero-dropdown',
  templateUrl: './formero-dropdown.component.html',
  styleUrls: ['./formero-dropdown.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor, NgIf, FormeroFieldMessagesComponent],
})
export class FormeroDropdownComponent implements OnInit {
  @Input() props: FormeroQuestionDropdown;
  @Input() form: UntypedFormGroup;
  @Input() displayMessages: boolean;

  constructor() {}

  ngOnInit(): void {}
}
