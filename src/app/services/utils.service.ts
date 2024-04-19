import { Injectable } from '@angular/core';
import { v4 as uuid_v4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  sortByOrderProp = (a, b): number => a.order - b.order;

  toArray = (value: any): any[] =>
    Array.isArray(value) ? [...value] : typeof value !== 'undefined' ? [value] : [];

  onlyTruthy = (values: any[]): boolean[] => values.filter(Boolean);

  isAllTruthy = (values: any[]): boolean => values.every((value) => !!value);

  isAllBoolean = (values: any[]): boolean =>
    values.every((value) => value === true || value === false);

  truthyToIndexes = (values: boolean[]): number[] =>
    values.reduce((acc, val, index) => {
      return val ? [...acc, index] : acc;
    }, []);

  createIndexesArray = (length: number): number[] => {
    const actualIndexes: number[] = [];
    for (let i: number = 0; i < length; i++) {
      actualIndexes.push(i);
    }
    return actualIndexes;
  };

  getMultipleArrayValues = (valuesArray: any[], indexesArray: number[]): any[] => {
    return indexesArray.reduce((acc, val) => [...acc, valuesArray[val]], []);
  };

  cherryPickFromArray = (valuesArray: any[], indexesArray: (number | number[])[]) => {
    if (!Array.isArray(valuesArray) || !Array.isArray(indexesArray)) {
      // return without value (we don't use `null` cause this is value also)
      return;
    }

    // at this level we need only first dimension's indexes
    let actualIndexes = indexesArray[0];

    if (!Array.isArray(actualIndexes)) {
      actualIndexes = [actualIndexes];
    }

    if (actualIndexes.length === 0) {
      // If indexes is empty array, create array with all indexes.
      // With this we can cherry-pick all values.
      actualIndexes = this.createIndexesArray(valuesArray.length);
    }

    const cherryPickedValues: any = [];

    actualIndexes.forEach((val) => {
      const actualValue = valuesArray[val];

      if (typeof actualValue !== 'undefined') {
        if (Array.isArray(actualValue)) {
          const copy = [...indexesArray];
          copy.shift(); // delete first item
          cherryPickedValues.push(this.cherryPickFromArray(actualValue, copy));
        } else {
          cherryPickedValues.push(actualValue);
        }
      }
    });

    return cherryPickedValues;
  };

  // Copy only listed properties.
  copyObjectByKeys(sourceObject, keysToCopy: string[]) {
    if (!sourceObject && typeof sourceObject !== 'object') {
      return;
    }

    const destObject = {};
    const keys = Object.keys(sourceObject);

    keys.forEach((key) => {
      if (keysToCopy.includes(key)) {
        destObject[key] = sourceObject[key];
      }
    });

    return destObject;
  }

  isEmpty(value) {
    // if value is not provided return undefined
    if (arguments.length < 1) {
      return;
    }

    if (typeof value === 'undefined' || value === null) {
      return true;
    }

    if (value === 0) {
      return false;
    }

    if (value === true || value === false) {
      return !value;
    }

    if (typeof value === 'string') {
      return value.trim() === '';
    }

    if (Array.isArray(value)) {
      return value.every((item) => this.isEmpty(item));
    }

    // todo: handle other values ({}, new String(), new Boolean, NaN, Infinity...)

    return !value;
  }

  scrollToTop(): void {
    window.scrollTo(0, 0); // todo: not direct DOM call
  }

  uuid() {
    return uuid_v4();
  }
}
