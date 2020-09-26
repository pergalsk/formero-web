import { Injectable } from '@angular/core';

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

  scrollToTop(): void {
    window.scrollTo(0, 0); // todo: not direct DOM call
  }

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
}
