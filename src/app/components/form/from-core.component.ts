import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormBlocksComponent } from '@components/form/form-blocks.component';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { FormBlocksSet } from '@services/schema.service';

@Component({
  selector: 'app-form-core',
  standalone: true,
  imports: [FormBlocksComponent, ReactiveFormsModule],
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
        [questions]="questions"
        [displayMessages]="displayFieldMessages"
        [draggable]="draggable"
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
    <!--<pre>{{ formRawValue | json }}</pre>-->
    <!--<pre>{{ formData | json }}</pre>-->
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FromCoreComponent {
  @Input() questions: FormBlocksSet;
  @Input() formData: UntypedFormGroup;
  @Input() displayFieldMessages: boolean = false;
  @Input() draggable: boolean = false;
}
