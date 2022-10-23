import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControlStatus } from '@angular/forms';
import { Subscription } from 'rxjs';

const messages = {
  required: 'Pole je povinné.',
  email: 'Nesprávny formát emailovej adresy.',
  emailPattern: 'Nesprávny formát emailovej adresy.',
  maxlength: 'Pole môže obsahovať maximálne {{ control.errors?.maxlength.requiredLength }} znakov.',
  minlength: 'Pole musí obsahovať minimálne {{ control.errors?.minlength.requiredLength }} znakov.',
  checked: 'Potrebné označiť počet položiek {{ control.errors?.checked.requiredChecked }}.',
  minChecked:
    'Potrebné označiť minimálny počet položiek  {{ control.errors?.minChecked.requiredChecked }}.',
  maxChecked:
    'Môže byť označených maximálny počet položiek {{ control.errors?.maxChecked.requiredChecked }}.',
  groupRequired: 'Musí byť vyplnené aspoň jedno pole zo skupiny.',
};

@Component({
  selector: 'app-formero-field-messages',
  templateUrl: './formero-field-messages.component.html',
  styleUrls: ['./formero-field-messages.component.scss'],
})
export class FormeroFieldMessagesComponent implements OnInit, OnDestroy {
  @Input() control: AbstractControl;
  @Input() label: string;
  @Input() boxed = false;

  message = '';
  controlStatus$: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.refreshMessages(this.control.status);

    this.controlStatus$ = this.control.statusChanges.subscribe((status: FormControlStatus) => {
      this.refreshMessages(status);
    });
  }

  private refreshMessages(status: FormControlStatus) {
    if (status !== 'INVALID') {
      return;
    }

    if (this.control.errors == null) {
      return;
    }

    for (const key of Object.keys(this.control.errors)) {
      this.message = messages[key] || '';
    }
  }

  ngOnDestroy(): void {
    this.controlStatus$.unsubscribe();
  }
}
