import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormArray,
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

  checkedValidator = this.checkedValidatorFactory((control, requiredChecked = 1, actualChecked) =>
    actualChecked !== requiredChecked ? { checked: { requiredChecked, actualChecked } } : null
  );

  minCheckedValidator = this.checkedValidatorFactory((control, requiredChecked, actualChecked) =>
    actualChecked < requiredChecked ? { minChecked: { requiredChecked, actualChecked } } : null
  );

  maxCheckedValidator = this.checkedValidatorFactory((control, requiredChecked, actualChecked) =>
    actualChecked > requiredChecked ? { maxChecked: { requiredChecked, actualChecked } } : null
  );

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
