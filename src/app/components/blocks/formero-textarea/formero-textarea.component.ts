import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormeroQuestionTextarea } from '../../../Question';
import { FormeroFieldMessagesComponent } from '../../common/formero-field-messages/formero-field-messages.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-formero-textarea',
    templateUrl: './formero-textarea.component.html',
    styleUrls: ['./formero-textarea.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf,
        FormeroFieldMessagesComponent,
    ],
})
export class FormeroTextareaComponent implements OnInit {
  @Input() props: FormeroQuestionTextarea;
  @Input() form: UntypedFormGroup;
  @Input() displayMessages: boolean;

  constructor() {}

  ngOnInit(): void {}
}
