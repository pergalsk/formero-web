import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NgIf, NgFor, JsonPipe, CurrencyPipe } from '@angular/common';
import { UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchemaService, FormBlocksSet } from '@services/schema.service';
import { UtilsService } from '@services/utils.service';
import { CalculationsService } from '@services/calculations.service';
import { QuickInfoComponent } from '../common/quick-info/quick-info.component';
import { PanelComponent } from '../ui/panel/panel.component';
import { FormBlocksComponent } from '@components/form/form-blocks.component';
import { FromCoreComponent } from '@components/form/from-core.component';
import { SchemaBlock } from '@app/schema/schema';

export enum State {
  Init = 'INIT',
  Submitting = 'SUBMITTING',
  SubmitError = 'SUBMIT_ERROR',
  SubmitSuccess = 'SUBMIT_SUCCESS',
  Editing = 'EDITING',
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    PanelComponent,
    QuickInfoComponent,
    JsonPipe,
    CurrencyPipe,
    FormBlocksComponent,
    FromCoreComponent,
  ],
})
export class FormComponent implements OnInit, OnChanges {
  @Input() blocks: FormBlocksSet;
  @Input() calculations: any;
  @Input() draggable = false;
  @Input() selectable = false;

  @Output() select: EventEmitter<SchemaBlock> = new EventEmitter<SchemaBlock>();

  formData: UntypedFormGroup;
  questions: FormBlocksSet;
  calculationSchema: any;
  displayFieldMessages: boolean;
  initValue: { [key: string]: any } = {};
  batchItems: Array<any> = [];
  editedBatchItem: number | null = null;
  sharedFieldsKeys: Array<string> = [];
  quickInfoFieldsKeys: Array<string> = [];
  partialSum: number | null = null;
  totalSum: number | null = null;
  showSums = false;
  errors: Array<string> = [];
  state: State = State.Init;

  STATE = State;

  utilsService: UtilsService = inject(UtilsService);
  schemaService: SchemaService = inject(SchemaService);
  calculationsService: CalculationsService = inject(CalculationsService);
  changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.initialize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (Object.values(changes).every(({ firstChange }) => firstChange)) {
      return;
    }
    this.initialize();
  }

  initialize(): void {
    this.questions = this.blocks;
    this.calculationSchema = this.calculations;
    this.showSums = !!this.calculations;

    this.formData = this.schemaService.initEmptyForm();
    this.initValue = this.schemaService.extractFormInitValue(this.questions.blocks);
    this.sharedFieldsKeys = this.schemaService.keysByProp('shared', this.questions?.blocks);
    this.quickInfoFieldsKeys = this.schemaService.keysByProp('quickInfo', this.questions.blocks);
    this.displayFieldMessages = false;

    if (this.calculationSchema) {
      this.calculate();
      this.formData.valueChanges.subscribe(() => this.calculate());
    }
  }

  submitOne(): void {
    if (!this.isFormValid()) {
      this.displayFieldMessages = true;
      console.log('Submit: Form is not valid!');
      return;
    }

    this.batchSubmit([{ val: { ...this.formRawValue }, sum: this.partialSum }]);
  }

  submitMultiple(): void {
    this.batchSubmit([...this.batchItems]); // todo: need to deep clone ?
  }

  addBatchItem(): void {
    if (!this.isFormValid()) {
      this.displayFieldMessages = true;
      console.log('Add batch item: Form is not valid!');
      return;
    }

    this.batchItems = [...this.batchItems, { val: { ...this.formRawValue }, sum: this.partialSum }];
    this.totalSum = this.calculateTotalSum(this.batchItems);
    this.resetNonSharedForm(this.formRawValue);
    this.state = State.Init;
  }

  deleteAllBatchItems(): void {
    this.batchItems = [];
    this.totalSum = 0; // todo: or null when without calculations
  }

  onEditBatchItem(index: number): void {
    alert(`This will rewrite all form content - editBatchItem(${index}).`);
    this.editedBatchItem = index;
    this.formData.setValue(this.batchItems[index].val);
    this.utilsService.scrollToTop();
    this.state = State.Editing;
  }

  onDeleteBatchItem(index: number): void {
    this.batchItems = [...this.batchItems.slice(0, index), ...this.batchItems.slice(index + 1)];
    this.totalSum = this.calculateTotalSum(this.batchItems);
  }

  cancelBatchItemChanges(): void {
    alert('Chcete zrušiť zmeny ?');
    this.editedBatchItem = null;
    this.formData.reset(this.initValue);
    this.displayFieldMessages = false;
    this.state = State.Init;
  }

  saveBatchItemChanges(): void {
    if (!this.isFormValid()) {
      this.displayFieldMessages = true;
      console.log('Save batch item: Form is not valid!');
      return;
    }

    this.batchItems[this.editedBatchItem] = { val: { ...this.formRawValue }, sum: this.partialSum };
    this.editedBatchItem = null;
    this.totalSum = this.calculateTotalSum(this.batchItems);
    this.resetNonSharedForm(this.formRawValue);
    this.state = State.Init;
  }

  startNewForm(): void {
    this.batchItems = [];
    this.resetForm();
    this.state = State.Init;
  }

  resetForm(): void {
    this.errors = [];
    this.displayFieldMessages = false;
    this.formData.reset(this.initValue);
    this.utilsService.scrollToTop();
  }

  private isFormValid(): boolean {
    return this.formData.valid;
  }

  private calculate(): void {
    // todo: add here optional global/default value calculation
    // todo: if calculation fails do not return 0 as value (0 can be proper calc result)

    this.partialSum = this.calculationsService.calculateFormValue(
      this.formRawValue,
      this.calculationSchema,
    );
  }

  private calculateTotalSum(batchItems: any[]) {
    return batchItems.reduce((total, item) => total + item.sum, 0);
  }

  private batchSubmit(batchFormData: any[]): void {
    if (!batchFormData.length) {
      return;
    }

    this.errors = [];
    this.state = State.Submitting;

    const data = this.schemaService.prepareSubmitData(batchFormData, this.questions);

    console.table(data);

    this.schemaService.submitAnswers(this.questions.id, data).subscribe({
      next: (resp) => {
        this.state = State.SubmitSuccess;
        console.log(resp);
      },
      error: (error) => {
        this.state = State.SubmitError;
        this.errors = [...this.errors, error];
        this.utilsService.scrollToTop();
      },
    });
  }

  private resetNonSharedForm(formDataValue): void {
    const sharedValue = this.utilsService.copyObjectByKeys(formDataValue, this.sharedFieldsKeys);
    this.formData.reset(Object.assign({}, this.initValue, sharedValue));
    this.displayFieldMessages = false;
  }

  generateQR(): void {
    this.schemaService.generateQR().subscribe();
  }

  get formRawValue() {
    return this.formData.getRawValue();
  }

  onSelect(block: SchemaBlock) {
    if (this.selectable) {
      this.select.emit(block);
    }
  }
}
