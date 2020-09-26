import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionsService, FormBlocksSet } from './services/questions.service';
import { UtilsService } from './services/utils.service';

export enum Status {
  Initializing = 'INITIALIZING',
  InitError = 'INIT_ERROR',
  InitSuccess = 'INIT_SUCCESS',
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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  formData: FormGroup;
  questions: FormBlocksSet;

  displayFieldMessages: boolean;
  initValue: { [key: string]: any } = {};
  batchItems: Array<any> = [];
  editedBatchItem: number | null = null;
  sharedFieldsKeys: Array<string> = [];
  quickInfoFieldsKeys: Array<string> = [];
  errors: Array<string> = [];
  status: Status = Status.Initializing;

  STATUS = Status;
  ACTION = Action;

  constructor(private questionsService: QuestionsService, private utilsService: UtilsService) {}

  ngOnInit(): void {
    // todo: unsubscribe
    this.questionsService.getQuestions().subscribe(this.getQuestionSuccess, this.getQuestionError);
    this.utilsService.scrollToTop();
    this.displayFieldMessages = false;
  }

  getQuestionSuccess = (data) => {
    this.questions = data; // todo: clone
    this.formData = this.questionsService.buildForm(this.questions);
    this.initValue = this.questionsService.extractFormInitValue(this.questions.blocks);
    this.sharedFieldsKeys = this.questionsService.extractSharedControlKeys(this.questions.blocks);
    this.quickInfoFieldsKeys = this.questionsService.extractQuickInfoControlKeys(
      this.questions.blocks
    );
    this.status = Status.InitSuccess;
    console.log(
      `Form schema ID=${this.questions.id} successfully loaded (containing ${this.questions.blocks.length} form blocks).`
    );
  };

  getQuestionError = (error) => {
    this.status = Status.InitError;
    this.errors = [...this.errors, error];
  };

  onSubmit($event: SubmitEvent): void {
    if (!$event || $event.type !== 'submit') {
      return;
    }

    const action: Action = $event.submitter.name as Action;
    console.log('Submit action: ', action);

    switch (action) {
      case Action.SubmitOne:
        this.submitOne(this.formRawValue);
        break;
      case Action.SubmitMultiple:
        this.submitMultiple(this.batchItems);
        break;
      default:
        return;
    }
  }

  submitOne(formRawValue: any) {
    if (!this.formData.valid) {
      this.displayFieldMessages = true;
      console.log('Submit: Form is not valid!');
      return;
    }

    this.batchSubmit([{ ...formRawValue }]);
  }

  submitMultiple(batchItems: any[]) {
    this.batchSubmit([...batchItems]); // todo: need to deep clone ?
  }

  onReset($event: Event) {
    $event.preventDefault();
    this.resetForm();
  }

  addBatchItem(): void {
    if (!this.formData.valid) {
      this.displayFieldMessages = true;
      console.log('Add batch item: Form is not valid!');
      return;
    }

    this.batchItems = [...this.batchItems, { ...this.formRawValue }];
    this.resetNonSharedForm(this.formRawValue);
    this.status = Status.InitSuccess;
  }

  deleteAllBatchItems() {
    this.batchItems = [];
  }

  onEditBatchItem(index: number): void {
    alert(`This will rewrite all form content - editBatchItem(${index}).`);
    this.editedBatchItem = index;
    this.formData.setValue(this.batchItems[index]);
    this.utilsService.scrollToTop();
    this.status = Status.Editing;
  }

  cancelBatchItemChanges() {
    alert('Chcete zrušiť zmeny ?');
    this.editedBatchItem = null;
    this.formData.reset(this.initValue);
    this.displayFieldMessages = false;
    this.status = Status.InitSuccess;
  }

  saveBatchItemChanges() {
    if (!this.formData.valid) {
      this.displayFieldMessages = true;
      console.log('Save batch item: Form is not valid!');
      return;
    }

    this.batchItems[this.editedBatchItem] = { ...this.formRawValue };
    this.editedBatchItem = null;
    this.resetNonSharedForm(this.formRawValue);
    this.status = Status.InitSuccess;
  }

  onDeleteBatchItem(index: number): void {
    this.batchItems = [...this.batchItems.slice(0, index), ...this.batchItems.slice(index + 1)];
  }

  startNewForm(): void {
    this.batchItems = [];
    this.resetForm();
    this.displayFieldMessages = false;
    this.status = Status.InitSuccess;
  }

  private batchSubmit(batchFormData: any[]): void {
    if (!batchFormData.length) {
      return;
    }

    this.errors = [];
    this.status = Status.Submitting;

    const submitData = this.questionsService.prepareSubmitData(batchFormData, this.questions);

    console.table(submitData);

    this.questionsService.submitAnswers(submitData).subscribe(
      (resp) => {
        this.status = Status.SubmitSuccess;
        console.log(resp);
      },
      (error) => {
        this.status = Status.SubmitError;
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

  get phoneNumberMother() {
    return this.formData.get('phoneNumberMother');
  }

  get phoneNumberFather() {
    return this.formData.get('phoneNumberFather');
  }

  get emailMother() {
    return this.formData.get('emailMother');
  }

  get emailFather() {
    return this.formData.get('emailFather');
  }
}
