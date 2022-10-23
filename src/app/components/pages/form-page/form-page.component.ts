import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { QuestionsService, FormBlocksSet } from '@services/questions.service';
import { UtilsService } from '@services/utils.service';
import { CalculationsService } from '@services/calculations.service';

export enum InitState {
  Initializing = 'INITIALIZING',
  Error = 'INIT_ERROR',
  Success = 'INIT_SUCCESS',
}

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss'],
})
export class FormPageComponent implements OnInit, OnDestroy {
  blocks: FormBlocksSet | null;
  calculations: any;
  state: InitState = InitState.Initializing;
  STATE = InitState;

  schema$: Subscription = null;
  calc$: Subscription = null;

  constructor(
    private route: ActivatedRoute,
    private questionsService: QuestionsService,
    private calculationsService: CalculationsService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.state = InitState.Initializing;
      this.initialize(params.id);
    });
  }

  ngOnDestroy() {
    this.schema$?.unsubscribe();
    this.calc$?.unsubscribe();
  }

  /**
   *
   * @param schemaId
   * @private
   */
  private initialize(schemaId?: number) {
    if (schemaId == null) {
      return;
    }

    this.blocks = null;
    this.calculations = null;

    this.schema$?.unsubscribe();
    this.calc$?.unsubscribe();

    this.schema$ = this.questionsService.getQuestions(schemaId).subscribe({
      next: this.getQuestionSuccess.bind(this),
      error: this.getQuestionError.bind(this),
    });

    this.utilsService.scrollToTop();
  }

  /**
   *
   * @param questionsData
   * @private
   */
  private getQuestionSuccess(questionsData) {
    console.log(
      `Form schema ID=${questionsData.id} successfully loaded (containing ${questionsData.blocks.length} form blocks).`
    );

    this.blocks = questionsData; // todo: clone

    if (!questionsData?.calculationsId) {
      this.state = InitState.Success;
      console.log(`Form doesn't have calculations. Starting form without calculations feature.`);
      return;
    }

    this.calc$ = this.calculationsService
      .getCalculations(questionsData.calculationsId)
      .subscribe(this.getCalculationsSuccess.bind(this));
  }

  /**
   *
   * @private
   */
  private getQuestionError() {
    this.state = InitState.Error;
    console.log(`Form schema loading error.`);
  }

  /**
   *
   * @param calculationsData
   * @private
   */
  private getCalculationsSuccess(calculationsData) {
    this.state = InitState.Success;
    this.calculations = calculationsData;
    console.log(
      `Form calculations ID=${this.blocks.calculationsId} successfully loaded (containing ${this.calculations.length} parts).`
    );
  }
}
