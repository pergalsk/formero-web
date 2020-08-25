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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  formData: FormGroup;
  questions: FormBlocksSet;

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
    this.utilsService.scrollToTop();
    this.questionsService.getQuestions().subscribe(
      (data) => {
        this.questions = data; // todo: clone
        this.sharedFieldsKeys = this.questionsService.extractSharedControlKeys(
          this.questions.blocks
        );
        this.quickInfoFieldsKeys = this.questionsService.extractQuickInfoControlKeys(
          this.questions.blocks
        );
        this.formData = this.questionsService.buildForm(this.questions);
        this.status = Status.InitSuccess;
        console.log(
          `Form schema ID=${this.questions.id} successfully loaded (containing ${this.questions.blocks.length} form blocks).`
        );
      },
      (error) => {
        this.status = Status.InitError;
        this.errors = [...this.errors, error];
      }
    );
  }

  onSubmit($event): void {
    if (!$event || $event.type !== 'submit') {
      return;
    }

    let data: any[];
    const action = $event.submitter.name;

    console.log('Submit action: ', action);

    switch (action) {
      case Action.SubmitOne:
        data = [this.formData.value];
        break;
      case Action.SubmitMultiple:
        data = [...this.batchItems];
        break;
      default:
        return;
    }

    this.batchSubmit(data);
  }

  batchSubmit(data: any[]): void {
    if (!data.length) {
      return;
    }

    this.errors = [];
    this.status = Status.Submitting;

    console.table(data);

    this.questionsService.submitAnswers(data).subscribe(
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

  addBatchItem(): void {
    this.batchItems = [...this.batchItems, this.formData.value];
    this.resetNonSharedForm(this.formData.value);
    // this.utilsService.scrollToTop();
    this.status = Status.InitSuccess;
  }

  deleteAllBatchItems() {
    this.batchItems = [];
  }

  onEditBatchItem(index: number): void {
    alert(`This will rewrite all form content - editBatchItem(${index}).`);
    this.editedBatchItem = index;
    this.formData.reset(this.batchItems[index]);
    this.utilsService.scrollToTop();
    this.status = Status.Editing;
  }

  cancelBatchItemChanges() {
    alert('Chcete zrušiť zmeny ?');
    this.editedBatchItem = null;
    this.formData.reset();
    this.status = Status.InitSuccess;
  }

  saveBatchItemChanges() {
    this.batchItems[this.editedBatchItem] = { ...this.formData.value };
    this.editedBatchItem = null;
    this.formData.reset();
    // this.utilsService.scrollToTop();
    this.status = Status.InitSuccess;
  }

  onDeleteBatchItem(index: number): void {
    this.batchItems = [...this.batchItems.slice(0, index), ...this.batchItems.slice(index + 1)];
  }

  startAgain(): void {
    this.batchItems = [];
    this.resetForm();
    this.status = Status.InitSuccess;
  }

  resetForm(): void {
    this.errors = [];
    this.formData.reset();
    this.utilsService.scrollToTop();
  }

  resetNonSharedForm(formDataValue): void {
    const initValue = this.utilsService.copyObjectByKeys(formDataValue, this.sharedFieldsKeys);
    this.formData.reset(initValue);
  }

  generateQR(): void {
    this.questionsService.generateQR().subscribe();
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
