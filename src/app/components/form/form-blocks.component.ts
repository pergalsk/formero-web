import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { JsonPipe, NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
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
import { OrderListModule } from 'primeng/orderlist';

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
    OrderListModule,
    NgTemplateOutlet,
    JsonPipe,
  ],
  template: `
    @if (draggable && questions.blocks.length > 1) {
      <p-orderList [value]="questions.blocks" [dragdrop]="true" [responsive]="true">
        <ng-template let-question pTemplate="item">
          <app-panel [type]="question?.layout?.panel">
            <ng-container
              *ngTemplateOutlet="blocksTpl; context: { $implicit: question }"
            ></ng-container>
          </app-panel>
        </ng-template>
      </p-orderList>
    } @else {
      <app-panel *ngFor="let question of questions.blocks" [type]="question?.layout?.panel">
        <ng-container *ngTemplateOutlet="blocksTpl; context: { $implicit: question }" />
      </app-panel>
    }

    <ng-template #blocksTpl let-question>
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
    </ng-template>
  `,
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormBlocksComponent {
  @Input() form: UntypedFormGroup;
  @Input() questions: FormBlocksSet;
  @Input() displayMessages: boolean;
  @Input() draggable: boolean = false;
}
