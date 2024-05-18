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
      key: 'quickinfo',
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

  layout() {
    return {
      key: 'layout',
      type: 'dropdown',
      value: 1,
      label: 'Štýl',
      layout: { panel: 1 },
      options: [
        {
          value: 1,
          label: 'Štýl 1',
        },
        {
          value: 2,
          label: 'Štýl 2',
        },
        {
          value: 3,
          label: 'Štýl 3',
        },
        {
          value: 4,
          label: 'Štýl 4',
        },
      ],
    };
  }
}
