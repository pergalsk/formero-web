import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormeroQuestionTextbox } from '@app/Question';
import { FormeroFieldMessagesComponent } from '../../common/formero-field-messages/formero-field-messages.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-formero-textbox',
  templateUrl: './formero-textbox.component.html',
  styleUrls: ['./formero-textbox.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, FormeroFieldMessagesComponent],
})
export class FormeroTextboxComponent implements OnInit {
  @Input() props: FormeroQuestionTextbox;
  @Input() form: UntypedFormGroup;
  @Input() displayMessages: boolean;

  constructor() {}

  ngOnInit(): void {}
}
