import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { QuestionsService, FormBlocksSet } from '@services/questions.service';
import { UtilsService } from '@services/utils.service';
import { CalculationsService } from '@services/calculations.service';

export enum State {
  Init = 'INIT',
  Submitting = 'SUBMITTING',
  SubmitError = 'SUBMIT_ERROR',
  SubmitSuccess = 'SUBMIT_SUCCESS',
  Editing = 'EDITING',
}

export enum Action {
  SubmitOne = 'SUBMIT_ONE',
  SubmitMultiple = 'SUBMIT_MULTIPLE',
}

// This kind of event is not defined in TypeScript
interface SubmitEvent extends Event {
  submitter: HTMLFormElement;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() blocks: FormBlocksSet;
  @Input() calculations: any;

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
  ACTION = Action;

  constructor(
    private utilsService: UtilsService,
    private questionsService: QuestionsService,
    private calculationsService: CalculationsService
  ) {}

  ngOnInit(): void {
    this.questions = this.blocks;
    this.calculationSchema = this.calculations;
    this.showSums = !!this.calculations;
    this.initialize();
  }

  initialize(): void {
    this.formData = this.questionsService.buildForm(this.questions);
    this.initValue = this.questionsService.extractFormInitValue(this.questions.blocks);
    this.sharedFieldsKeys = this.questionsService.extractSharedControlKeys(this.questions?.blocks);
    this.quickInfoFieldsKeys = this.questionsService.extractQuickInfoControlKeys(
      this.questions.blocks
    );

    if (this.calculationSchema) {
      this.calculate();
      this.formData.valueChanges.subscribe(() => {
        this.calculate();
      });
    }

    this.displayFieldMessages = false;
  }

  onSubmit($event: SubmitEvent): void {
    if (!$event || $event.type !== 'submit') {
      return;
    }

    const action: Action = $event.submitter.name as Action;
    console.log('Submit action: ', action);

    switch (action) {
      case Action.SubmitOne:
        this.submitOne();
        break;
      case Action.SubmitMultiple:
        this.submitMultiple(this.batchItems);
        break;
      default:
        return;
    }
  }

  private submitOne() {
    if (!this.isFormValid()) {
      this.displayFieldMessages = true;
      console.log('Submit: Form is not valid!');
      return;
    }

    this.batchSubmit([
      {
        val: { ...this.formRawValue },
        sum: this.partialSum,
      },
    ]);
  }

  private isFormValid() {
    return this.formData.valid;
  }

  private submitMultiple(batchItems: any[]) {
    this.batchSubmit([...batchItems]); // todo: need to deep clone ?
  }

  onReset($event: Event) {
    $event.preventDefault();
    this.resetForm();
  }

  addBatchItem(): void {
    if (!this.isFormValid()) {
      this.displayFieldMessages = true;
      console.log('Add batch item: Form is not valid!');
      return;
    }

    this.batchItems = [
      ...this.batchItems,
      {
        val: { ...this.formRawValue },
        sum: this.partialSum,
      },
    ];
    this.totalSum = this.calculateTotalSum(this.batchItems);
    this.resetNonSharedForm(this.formRawValue);
    this.state = State.Init;
  }

  deleteAllBatchItems() {
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

  cancelBatchItemChanges() {
    alert('Chcete zrušiť zmeny ?');
    this.editedBatchItem = null;
    this.formData.reset(this.initValue);
    this.displayFieldMessages = false;
    this.state = State.Init;
  }

  saveBatchItemChanges() {
    if (!this.isFormValid()) {
      this.displayFieldMessages = true;
      console.log('Save batch item: Form is not valid!');
      return;
    }

    this.batchItems[this.editedBatchItem] = {
      val: { ...this.formRawValue },
      sum: this.partialSum,
    };
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

  private calculate(): void {
    // todo: add here optional global/default value calculation
    // todo: if calculation fails do not return 0 as value (0 can be proper calc result)

    this.partialSum = this.calculationsService.calculateFormValue(
      this.formRawValue,
      this.calculationSchema
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

    const entries = this.questionsService.prepareSubmitData(batchFormData, this.questions);

    console.table(entries);

    this.questionsService.submitAnswers(this.questions.id, { entries }).subscribe(
      (resp) => {
        this.state = State.SubmitSuccess;
        console.log(resp);
      },
      (error) => {
        this.state = State.SubmitError;
        this.errors = [...this.errors, error];
        this.utilsService.scrollToTop();
      }
    );
  }

  private resetForm(): void {
    this.errors = [];
    this.displayFieldMessages = false;
    this.formData.reset(this.initValue);
    this.utilsService.scrollToTop();
  }

  private resetNonSharedForm(formDataValue): void {
    const sharedValue = this.utilsService.copyObjectByKeys(formDataValue, this.sharedFieldsKeys);
    this.formData.reset(Object.assign({}, this.initValue, sharedValue));
    this.displayFieldMessages = false;
  }

  generateQR(): void {
    this.questionsService.generateQR().subscribe();
  }

  get formRawValue() {
    return this.formData.getRawValue();
  }
}
