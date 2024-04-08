import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { UntypedFormGroup } from '@angular/forms';
import { FormBlocksSet } from '@services/schema.service';
import { PanelComponent } from '@components/ui/panel/panel.component';
import {
  FormeroAgreementComponent,
  FormeroBlocktextComponent,
  FormeroDropdownComponent,
  FormeroRadiogroupComponent,
  FormeroTextareaComponent,
  FormeroTextboxComponent,
  FormeroTitleComponent,
  FormeroCheckgroupComponent,
  FormeroValidationComponent,
} from '@app/components';

@Component({
  selector: 'app-form-blocks',
  standalone: true,
  host: { class: 'flx-col' },
  imports: [
    NgIf,
    NgForOf,
    PanelComponent,
    FormeroTitleComponent,
    FormeroBlocktextComponent,
    FormeroTextboxComponent,
    FormeroTextareaComponent,
    FormeroDropdownComponent,
    FormeroRadiogroupComponent,
    FormeroCheckgroupComponent,
    FormeroAgreementComponent,
    FormeroValidationComponent,
  ],
  template: `
    <app-panel *ngFor="let question of questions.blocks" [type]="question?.layout?.panel">
      <!--<pre>{{ question | json }}</pre>-->

      <app-formero-title *ngIf="question.getBlockType() === 'title'" [props]="question" />

      <app-formero-blocktext *ngIf="question.getBlockType() === 'blocktext'" [props]="question" />

      <app-formero-textbox
        *ngIf="question.getBlockType() === 'textbox'"
        [props]="question"
        [form]="form"
        [displayMessages]="displayMessages"
      />

      <app-formero-textarea
        *ngIf="question.getBlockType() === 'textarea'"
        [props]="question"
        [form]="form"
        [displayMessages]="displayMessages"
      />

      <app-formero-dropdown
        *ngIf="question.getBlockType() === 'dropdown'"
        [props]="question"
        [form]="form"
        [displayMessages]="displayMessages"
      />

      <app-formero-radiogroup
        *ngIf="question.getBlockType() === 'radiogroup'"
        [props]="question"
        [form]="form"
        [displayMessages]="displayMessages"
      />

      <app-formero-checkgroup
        *ngIf="question.getBlockType() === 'checkgroup'"
        [props]="question"
        [form]="form"
        [displayMessages]="displayMessages"
      />

      <app-formero-agreement
        *ngIf="question.getBlockType() === 'agreement'"
        [props]="question"
        [form]="form"
        [displayMessages]="displayMessages"
      />

      <app-formero-validation
        *ngIf="question.getBlockType() === 'validation'"
        [props]="question"
        [form]="form"
        [displayMessages]="displayMessages"
      />
    </app-panel>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormBlocksComponent {
  @Input() form: UntypedFormGroup;
  @Input() questions: FormBlocksSet;
  @Input() displayMessages: boolean;
}
