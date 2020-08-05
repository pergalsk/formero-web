import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  constructor() {}

  atLeastOneContactValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const phoneNumberMother = control.get('phoneNumberMother');
    const emailMother = control.get('emailMother');
    const phoneNumberFather = control.get('phoneNumberFather');
    const emailFather = control.get('emailFather');

    // at least one phone number and one email has to be provided
    if (
      ((phoneNumberMother && phoneNumberMother.value) ||
        (phoneNumberFather && phoneNumberFather.value)) &&
      ((emailMother && emailMother.value) || (emailFather && emailFather.value))
    ) {
      return null;
    }

    return { atLeastOneContact: true };
  }

  checkedValidator(control: AbstractControl): { [key: string]: boolean } | null {
    return control && control.value !== true ? { checked: true } : null;
  }

  forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? { forbiddenName: { value: control.value } } : null;
    };
  }
}
