import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { JsonPipe, NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { FormBlocksSet } from '@services/schema.service';
import { PanelComponent } from '@components/ui/panel/panel.component';
import {
  FormeroAgreementComponent,
  FormeroDropdownComponent,
  FormeroRadiogroupComponent,
  FormeroTextareaComponent,
  FormeroTextboxComponent,
  FormeroTitleComponent,
  FormeroCheckgroupComponent,
  FormeroValidationComponent,
} from '@app/components';
import { OrderListModule } from 'primeng/orderlist';
import { SchemaBlock } from '@app/schema/schema';

@Component({
  selector: 'app-form-blocks',
  standalone: true,
  host: { class: 'flx-col' },
  imports: [
    NgIf,
    NgForOf,
    PanelComponent,
    FormeroTitleComponent,
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
    @if (draggable && blocks.length > 1) {
      <p-orderList [value]="blocks" [dragdrop]="true" [responsive]="true">
        <ng-template let-block pTemplate="item">
          <ng-container *ngTemplateOutlet="blocksTpl; context: { $implicit: block }" />
        </ng-template>
      </p-orderList>
    } @else {
      @for (block of blocks; track $index) {
        <ng-container *ngTemplateOutlet="blocksTpl; context: { $implicit: block }" />
      }
    }

    <ng-template #blocksTpl let-block>
      <app-panel
        [type]="block?.layout?.panel"
        [selectable]="selectable"
        [selected]="block.key === selectedKey"
        (click)="onPanelSelect(block)"
      >
        <!--<pre>{{ block | json }}</pre>-->
        <app-formero-title *ngIf="block.type === 'paragraph'" [props]="block" />

        <app-formero-textbox
          *ngIf="block.type === 'textbox'"
          [props]="block"
          [form]="form"
          [displayMessages]="displayMessages"
        />

        <app-formero-textarea
          *ngIf="block.type === 'textarea'"
          [props]="block"
          [form]="form"
          [displayMessages]="displayMessages"
        />

        <app-formero-dropdown
          *ngIf="block.type === 'dropdown'"
          [props]="block"
          [form]="form"
          [displayMessages]="displayMessages"
        />

        <app-formero-radiogroup
          *ngIf="block.type === 'radiogroup'"
          [props]="block"
          [form]="form"
          [displayMessages]="displayMessages"
        />

        <app-formero-checkgroup
          *ngIf="block.type === 'checkgroup'"
          [props]="block"
          [form]="form"
          [displayMessages]="displayMessages"
        />

        <app-formero-agreement
          *ngIf="block.type === 'agreement'"
          [props]="block"
          [form]="form"
          [displayMessages]="displayMessages"
        />

        <app-formero-validation
          *ngIf="block.type === 'validation'"
          [props]="block"
          [form]="form"
          [displayMessages]="displayMessages"
        />
      </app-panel>
    </ng-template>
  `,
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormBlocksComponent {
  @Input() form: FormGroup;
  @Input() blocks: FormBlocksSet['blocks'];
  @Input() displayMessages: boolean;
  @Input() draggable: boolean = false;
  @Input() selectable: boolean = false;

  @Output() select: EventEmitter<SchemaBlock> = new EventEmitter<SchemaBlock>();

  selectedKey = '';

  onPanelSelect(block: SchemaBlock): void {
    if (this.selectable) {
      this.selectedKey = block.key;
      this.select.emit(block);
    }
  }
}
