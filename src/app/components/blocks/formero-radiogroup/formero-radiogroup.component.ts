import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormeroQuestionRadiogroup } from '../../../Question';
import { FormeroFieldMessagesComponent } from '../../common/formero-field-messages/formero-field-messages.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
    selector: 'app-formero-radiogroup',
    templateUrl: './formero-radiogroup.component.html',
    styleUrls: ['./formero-radiogroup.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgFor,
        NgIf,
        FormeroFieldMessagesComponent,
    ],
})
export class FormeroRadiogroupComponent implements OnInit {
  @Input() props: FormeroQuestionRadiogroup;
  @Input() form: UntypedFormGroup;
  @Input() displayMessages: boolean;

  constructor() {}

  ngOnInit(): void {}
}
