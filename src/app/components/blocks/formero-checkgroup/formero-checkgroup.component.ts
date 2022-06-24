import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UtilsService } from '../../../services/utils.service';
import { FormeroQuestionCheckgroup } from '../../../Question';

@Component({
  selector: 'app-formero-checkgroup',
  templateUrl: './formero-checkgroup.component.html',
  styleUrls: ['./formero-checkgroup.component.scss'],
})
export class FormeroCheckgroupComponent implements OnInit, OnDestroy {
  @Input() props: FormeroQuestionCheckgroup;
  @Input() form: UntypedFormGroup;
  @Input() displayMessages: boolean;

  control: UntypedFormArray;
  displayAllChecked: boolean;
  allChecked: boolean;
  optionsNum: number;
  valueChangeSubscription: Subscription;

  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {
    const { isAllTruthy } = this.utilsService;

    this.control = this.form.controls[this.props.key] as UntypedFormArray;
    this.optionsNum =
      (this.props && Array.isArray(this.props.options) && this.props.options.length) || 0;
    this.displayAllChecked = this.optionsNum > 3;

    if (this.displayAllChecked) {
      // Initial all-checkbox set-up.
      this.allChecked = isAllTruthy(this.control.value);
      // Observing control value change.
      this.valueChangeSubscription = this.control.valueChanges
        .pipe(map(isAllTruthy))
        .subscribe((allChecked) => {
          this.allChecked = allChecked;
        });
    }
  }

  ngOnDestroy(): void {
    this.valueChangeSubscription?.unsubscribe();
  }

  onChangeAll() {
    // Change only enabled values and leave untouched disabled ones.
    const value: boolean[] = [...this.control.getRawValue()];
    for (let i = 0; i < this.control.length; i++) {
      if (this.control.at(i).enabled) {
        value[i] = this.allChecked;
      }
    }
    this.control.setValue(value);

    // This is non-UI update so we must mark as dirty and touched manually.
    this.control.markAsDirty();
    this.control.markAsTouched();
  }
}
