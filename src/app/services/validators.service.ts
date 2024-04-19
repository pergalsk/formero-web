import { Injectable } from '@angular/core';
import {
  AbstractControl,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { UtilsService } from './utils.service';
import { RawValidatorInfo } from './schema.service';

export interface ResolverCallbackFn {
  (control: AbstractControl, requiredChecked: number, actualChecked: number): ValidationErrors;
}

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  constructor(private utilsService: UtilsService) {}

  // https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression
  private readonly emailPattern =
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

  // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  // private readonly emailPattern = /\S+@\S+\.\S+/;

  emailPatternValidator = this.patternValidatorFactory(this.emailPattern, 'emailPattern');

  checkedValidator = this.checkedValidatorFactory((control, requiredChecked = 1, actualChecked) =>
    actualChecked !== requiredChecked ? { checked: { requiredChecked, actualChecked } } : null,
  );

  minCheckedValidator = this.checkedValidatorFactory((control, requiredChecked, actualChecked) =>
    actualChecked < requiredChecked ? { minChecked: { requiredChecked, actualChecked } } : null,
  );

  maxCheckedValidator = this.checkedValidatorFactory((control, requiredChecked, actualChecked) =>
    actualChecked > requiredChecked ? { maxChecked: { requiredChecked, actualChecked } } : null,
  );

  processRawValidators(rawValidator: RawValidatorInfo): ValidatorFn | null {
    let validatorFn: ValidatorFn | null;

    switch (rawValidator.type) {
      case 'required':
        validatorFn = Validators.required;
        break;

      case 'maxLength':
        validatorFn = Validators.maxLength(rawValidator.params[0]);
        break;

      case 'minLength':
        validatorFn = Validators.minLength(rawValidator.params[0]);
        break;

      case 'email':
        validatorFn = Validators.email;
        break;

      case 'emailPattern':
        validatorFn = this.emailPatternValidator;
        break;

      case 'checkedValidator':
        validatorFn = this.checkedValidator(rawValidator.params[0]);
        break;

      case 'minCheckedValidator':
        validatorFn = this.minCheckedValidator(rawValidator.params[0]);
        break;

      case 'maxCheckedValidator':
        validatorFn = this.maxCheckedValidator(rawValidator.params[0]);
        break;

      case 'groupRequiredValidator':
        validatorFn = this.groupRequiredValidator(rawValidator.params[0], rawValidator.message);
        break;

      default:
        validatorFn = null;
    }

    return validatorFn;
  }

  // Checks if given controls (by control name) has all equal values
  // e.g. ['password', 'password_confirm']
  groupEqualValidator(controlNamesSet: string[]): ValidatorFn {
    if (!Array.isArray(controlNamesSet) || controlNamesSet.length < 2) {
      return (): ValidationErrors | null => null;
    }
    return (control: UntypedFormGroup): ValidationErrors | null => {
      const equal: boolean = controlNamesSet.every(
        (val: string, index: number, arr: string[]): boolean => {
          return control.value[arr[0]] === control.value[val];
        },
      );
      return equal ? null : { groupEqual: true, controls: [...controlNamesSet] };
    };
  }

  groupRequiredValidator(controlNamesSet: string[] | string[][], message?: string): ValidatorFn {
    return (control: UntypedFormGroup): ValidationErrors | null => {
      // in every control names set has to be at least one control with non-empty string value
      // (fixed problem with 'every' https://github.com/microsoft/TypeScript/issues/36390)
      const hasValue: boolean = (controlNamesSet as any).every(
        (controlNames: string[] | string) => {
          if (typeof controlNames === 'string') {
            controlNames = [controlNames];
          }
          if (Array.isArray(controlNames)) {
            return controlNames.some((controlName: string) => {
              const ctrl: AbstractControl = control.get(controlName);
              // this works for different types of form value
              return ctrl && !this.utilsService.isEmpty(ctrl.value);
            });
          } else {
            return true; // if something other than string or array don't mark as error
          }
        },
      );
      return hasValue ? null : { groupRequired: message ? { message } : true };
    };
  }

  patternValidatorFactory(regExpPattern: RegExp, patternName: string): ValidatorFn {
    return (control: UntypedFormControl): ValidationErrors | null =>
      !control.value ? null : regExpPattern.test(control.value) ? null : { [patternName]: true };
  }

  checkedValidatorFactory(resolverCallbackFn: ResolverCallbackFn) {
    return (requiredChecked: number): ValidatorFn =>
      (control: AbstractControl): ValidationErrors | null => {
        const values: boolean[] = this.utilsService.toArray(
          control instanceof UntypedFormArray ? control.getRawValue() : control.value,
        );
        const actualChecked: number = this.utilsService.onlyTruthy(values).length;

        if (resolverCallbackFn) {
          return resolverCallbackFn(control, requiredChecked, actualChecked);
        }
        return null;
      };
  }

  isRequiredType(type: string): boolean {
    return [
      'required',
      'groupRequiredValidator',
      'minCheckedValidator',
      'checkedValidator',
    ].includes(type);
  }
}
