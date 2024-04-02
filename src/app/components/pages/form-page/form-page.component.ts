import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SchemaService, FormBlocksSet } from '@services/schema.service';
import { UtilsService } from '@services/utils.service';
import { CalculationsService } from '@services/calculations.service';
import { FormComponent } from '../../form/form.component';
import { NgIf } from '@angular/common';

export enum InitState {
  Initializing = 'INITIALIZING',
  Error = 'INIT_ERROR',
  Success = 'INIT_SUCCESS',
}

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss'],
  standalone: true,
  imports: [NgIf, FormComponent],
})
export class FormPageComponent implements OnInit, OnDestroy {
  blocks: FormBlocksSet | null;
  calculations: any;
  state: InitState = InitState.Initializing;
  STATE = InitState;

  schema$: Subscription = null;
  calc$: Subscription = null;

  route: ActivatedRoute = inject(ActivatedRoute);
  schemaService: SchemaService = inject(SchemaService);
  calculationsService: CalculationsService = inject(CalculationsService);
  utilsService: UtilsService = inject(UtilsService);

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

    this.schema$ = this.schemaService.getQuestions(schemaId).subscribe({
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
      `Form schema ID=${questionsData.id} successfully loaded (containing ${questionsData.blocks.length} form blocks).`,
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
      `Form calculations ID=${this.blocks.calculationsId} successfully loaded (containing ${this.calculations.length} parts).`,
    );
  }
}
