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
  sharedFieldsKeys: Array<string> = [];
  errors: Array<string> = [];
  status: Status = Status.Initializing;
  STATUS = Status;

  constructor(private questionsService: QuestionsService, private utilsService: UtilsService) {}

  ngOnInit(): void {
    // todo: unsubscribe
    this.questionsService.getQuestions().subscribe(
      (data) => {
        this.questions = data; // todo: clone
        this.sharedFieldsKeys = this.questionsService.extractSharedControlNames(
          this.questions.blocks
        );
        this.formData = this.questionsService.buildForm(this.questions);
        this.status = Status.InitSuccess;
      },
      (error) => {
        this.status = Status.InitError;
        this.errors.push(error);
        this.scrollToTop();
      }
    );
  }

  onSubmit(): void {
    this.errors = [];
    this.status = Status.Submitting;

    this.questionsService.submitAnswers(this.formData.value).subscribe(
      (resp) => {
        this.status = Status.SubmitSuccess;
        console.log(resp);
      },
      (error) => {
        this.status = Status.SubmitError;
        this.errors.push(error);
        this.scrollToTop();
      }
    );
  }

  addBatchItem(): void {
    this.batchItems.push(this.formData.value);
    this.resetNonSharedForm(this.formData.value);
    this.status = Status.InitSuccess;
    this.scrollToTop();
  }

  deleteBatchItem(): void {
    alert('deleteBatchItem()');
  }

  startAgain(): void {
    this.batchItems = [];
    this.resetForm();
    this.status = Status.InitSuccess;
  }

  resetForm(): void {
    this.errors = [];
    this.formData.reset();
    this.scrollToTop();
  }

  resetNonSharedForm(formDataValue) {
    const initValue = this.utilsService.copyObjectByKeys(formDataValue, this.sharedFieldsKeys);
    this.formData.reset(initValue);
  }

  generateQR(): void {
    this.questionsService.generateQR().subscribe();
  }

  scrollToTop(): void {
    window.scrollTo(0, 0); // todo: not direct DOM call
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
