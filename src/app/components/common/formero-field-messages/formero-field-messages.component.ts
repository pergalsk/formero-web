import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-formero-field-messages',
  templateUrl: './formero-field-messages.component.html',
  styleUrls: ['./formero-field-messages.component.scss'],
})
export class FormeroFieldMessagesComponent implements OnInit {
  @Input() control: AbstractControl;
  @Input() label: string;
  @Input() displayMessages: boolean;

  constructor() {}

  ngOnInit(): void {}
}
