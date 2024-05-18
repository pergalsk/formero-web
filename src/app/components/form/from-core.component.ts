import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormBlocksComponent } from '@components/form/form-blocks.component';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FormBlocksSet } from '@services/schema.service';
import { SchemaBlock } from '@app/schema/schema';

@Component({
  selector: 'app-form-core',
  standalone: true,
  imports: [JsonPipe, FormBlocksComponent, ReactiveFormsModule],
  exportAs: 'appFormCore',
  template: `
    <form
      #formRef
      [formGroup]="formData"
      [class.field-messages]="displayFieldMessages"
      autocomplete="off"
      class="flx-col"
    >
      <app-form-blocks
        [form]="formData"
        [blocks]="blocks"
        [displayMessages]="displayFieldMessages"
        [draggable]="draggable"
        [selectable]="selectable"
        (select)="onSelect($event)"
      />
    </form>

    <!-- LOG form data-->
    <!--<pre>
displayMessages: {{ displayFieldMessages }}
-&#45;&#45;
formData.errors:  {{ formData.errors | json }}
formData.invalid: {{ formData.invalid | json }}
formData.touched: {{ formData.touched | json }}
formData.dirty:   {{ formData.dirty | json }}
-&#45;&#45;
</pre>-->
    <!--<pre>{{ formData.getRawValue() | json }}</pre>-->
    <!--<pre>{{ formData.errors | json }}</pre>-->
  `,
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FromCoreComponent {
  @Input() blocks: FormBlocksSet['blocks'];
  @Input() formData: FormGroup;
  @Input() displayFieldMessages: boolean = false;
  @Input() draggable: boolean = false;
  @Input() selectable: boolean = false;

  @Output() select: EventEmitter<SchemaBlock> = new EventEmitter<SchemaBlock>();

  onSelect(block: SchemaBlock): void {
    if (this.selectable) {
      this.select.emit(block);
    }
  }
}
