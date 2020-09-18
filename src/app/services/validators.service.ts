import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { UtilsService } from './utils.service';

export interface ResolverCallbackFn {
  (control: AbstractControl, requiredChecked: number, actualChecked: number): ValidationErrors;
}

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  constructor(private utilsService: UtilsService) {}

  atLeastOneContactValidator(control: FormGroup): ValidationErrors | null {
    const phoneNumberMother: AbstractControl = control.get('phoneNumberMother');
    const emailMother: AbstractControl = control.get('emailMother');
    const phoneNumberFather: AbstractControl = control.get('phoneNumberFather');
    const emailFather: AbstractControl = control.get('emailFather');

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

  // https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression
  private readonly emailPattern = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

  // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  // private readonly emailPattern = /\S+@\S+\.\S+/;

  emailPatternValidator = this.patternValidatorFactory(this.emailPattern, 'emailPattern');

  checkedValidator = this.checkedValidatorFactory((control, requiredChecked = 1, actualChecked) =>
    actualChecked !== requiredChecked ? { checked: { requiredChecked, actualChecked } } : null
  );

  minCheckedValidator = this.checkedValidatorFactory((control, requiredChecked, actualChecked) =>
    actualChecked < requiredChecked ? { minChecked: { requiredChecked, actualChecked } } : null
  );

  maxCheckedValidator = this.checkedValidatorFactory((control, requiredChecked, actualChecked) =>
    actualChecked > requiredChecked ? { maxChecked: { requiredChecked, actualChecked } } : null
  );

  patternValidatorFactory(regExpPattern: RegExp, patternName: string): ValidatorFn {
    return (control: FormControl): ValidationErrors | null =>
      !control.value ? null : regExpPattern.test(control.value) ? null : { [patternName]: true };
  }

  checkedValidatorFactory(resolverCallbackFn: ResolverCallbackFn) {
    return (requiredChecked: number): ValidatorFn => (
      control: AbstractControl
    ): ValidationErrors | null => {
      const values: boolean[] = this.utilsService.toArray(
        control instanceof FormArray ? control.getRawValue() : control.value
      );
      const actualChecked: number = this.utilsService.onlyTruthy(values).length;

      if (resolverCallbackFn) {
        return resolverCallbackFn(control, requiredChecked, actualChecked);
      }
      return null;
    };
  }
}
