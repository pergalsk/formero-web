import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BlocksGalleryService {
  label(value: string) {
    return {
      key: 'label',
      type: 'textbox',
      label: 'Názov',
      value,
      validators: [{ type: 'maxLength', params: [100] }],
      layout: { panel: 1 },
    };
  }

  description(value: string) {
    return {
      key: 'description',
      type: 'textarea',
      label: 'Popis',
      value,
      validators: [{ type: 'maxLength', params: [2500] }],
      layout: { panel: 1 },
    };
  }

  quickinfo() {
    return {
      key: 'quickInfo',
      type: 'agreement',
      value: false,
      label: 'Zobraziť v sumárnej tabuľke',
      description:
        'Pri hromadnom odosielaní sa tento údaj zobrazí ' +
        'ako jeden zo sĺpcov prehľadovej tabuľky.',
      options: 'Zobraziť v sumáre',
      layout: { panel: 1 },
    };
  }

  shared() {
    return {
      key: 'shared',
      type: 'agreement',
      value: false,
      label: 'Zdieľané medzi odoslaniami',
      description: 'Pri hromadnom odosielaní sa tento údaj bude prenášať do ďalšieho vypĺňania.',
      options: 'Zdieľať',
      layout: { panel: 1 },
    };
  }

  validators() {
    return {
      key: 'validators',
      type: 'checkgroup',
      label: 'Validácie',
      layout: { panel: 1 },
      options: [
        {
          value: false,
          label: 'Povinné',
        },
        {
          value: false,
          label: 'Minimálny počet znakov (3)',
        },
        {
          value: false,
          label: 'Maximálny počet znakov (1500)',
        },
        {
          value: false,
          label: 'Emailova adresa',
        },
      ],
    };
  }

  layout() {
    return {
      key: 'layout',
      type: 'dropdown',
      value: -1,
      label: 'Štýl',
      layout: { panel: 1 },
      options: [
        {
          value: -1,
          label: 'Predvoelný',
        },
        {
          value: 0,
          label: 'S pozadím',
        },
        {
          value: 1,
          label: 'Bez pozadia',
        },
        {
          value: 2,
          label: 'Zvýraznený',
        },
        {
          value: 3,
          label: 'S okrajom',
        },
        {
          value: 4,
          label: 'Iba okraj bez pozadia',
        },
        {
          value: 5,
          label: 'Zvýraznený s okrajom',
        },
        {
          value: 6,
          label: 'Menší text',
        },
        {
          value: 7,
          label: 'Menší text bez pozadia',
        },
        {
          value: 8,
          label: 'Zvýraznený s menším textom',
        },
        {
          value: 9,
          label: 'Menší text s okrajom',
        },
      ],
    };
  }
}
