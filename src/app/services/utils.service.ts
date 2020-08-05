import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  sortByOrderProp = (a, b) => a.order - b.order;

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
}
