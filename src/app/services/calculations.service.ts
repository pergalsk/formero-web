import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { UtilsService } from './utils.service';
import { QuestionsService } from './questions.service';

@Injectable({
  providedIn: 'root',
})
export class CalculationsService {
  constructor(
    private httpClient: HttpClient,
    private questionsService: QuestionsService,
    private utilsService: UtilsService
  ) {}

  loadFormCalculations(calculationsId: number): Observable<any> {
    return this.httpClient.get(`/api/calculation/${calculationsId}`);
  }

  getCalculations(calculationsId: number) {
    return this.loadFormCalculations(calculationsId).pipe(
      map((calculations) => this.processFormCalculations(calculations)),
      catchError(
        this.questionsService.handleError(
          `Failed loading calculations ID=${calculationsId}. Starting form without calculations feature.`
        )
      )
    );
  }

  processFormCalculations(calculations) {
    return calculations;
  }

  calculateFormValue(formValueRAW: any, calculationsSchema: any): number | null {
    if (!Array.isArray(calculationsSchema)) {
      return null;
    }

    let addValue: number = 0;
    let mplValue: number = 1;

    calculationsSchema.forEach((calcPart) => {
      switch (calcPart.type) {
        case 'add':
          addValue += this.calculateValueFromDimensions(formValueRAW, calcPart) || 0;
          break;

        case 'mpl':
          mplValue *= this.calculateValueFromDimensions(formValueRAW, calcPart) || 1;
          break;

        case 'parts':
          // recursive calculation
          addValue += this.calculateFormValue(formValueRAW, calcPart.parts) || 0;
          break;

        default:
          // do nothing
          break;
      }
    });

    const result = addValue * mplValue;

    console.log(`Calculation result: ${result} = ${addValue} * ${mplValue}`);

    return result;
  }

  calculateValueFromDimensions(formValueRAW: any, calcPart: any): number | null {
    const { dimensions, values } = calcPart;

    if (!Array.isArray(dimensions) || !Array.isArray(values)) {
      return null;
    }

    const dimIndexes: (number | number[])[] = this.getIndexesFromDimensions(
      formValueRAW,
      dimensions
    );
    const cherryPickedValues: any = this.utilsService.cherryPickFromArray(values, dimIndexes);
    const flattenedValues: number[] = cherryPickedValues.flat(Infinity);

    return flattenedValues.reduce((acc, val) => acc + val, 0);
  }

  getIndexesFromDimensions(formValueRAW: any, dimensions: string[]): number[] {
    let dimIndexes = [];

    // todo: elaborate this function properly for different type form values

    Array.isArray(dimensions) &&
      dimensions.map((dimension) => {
        let rawVal = formValueRAW[dimension];

        if (Array.isArray(rawVal)) {
          if (this.utilsService.isAllBoolean(rawVal)) {
            rawVal = this.utilsService.truthyToIndexes(rawVal);
          }
        } else {
          // make array for easier further manipulation
          rawVal = [rawVal];
        }

        if (Array.isArray(rawVal)) {
          dimIndexes.push(rawVal);
        }
      });

    return dimIndexes;
  }
}
