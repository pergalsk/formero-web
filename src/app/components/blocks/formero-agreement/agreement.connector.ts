import { inject, Injectable } from '@angular/core';
import { BlockGroupType } from '@app/schema/schema';
import { BlocksGalleryService } from '@services/blocks-gallery.service';
import { UtilsService } from '@services/utils.service';

@Injectable({ providedIn: 'root' })
export class AgreementConnector {
  blockGallery: BlocksGalleryService = inject(BlocksGalleryService);
  utilsService: UtilsService = inject(UtilsService);

  private readonly type = 'agreement';
  private readonly uiTitle = 'Odsúhlasenie';
  private readonly uiType = BlockGroupType.CONTROL;
  private readonly uiOrder = 80;

  private readonly defaults = {
    key: '',
    order: 0,
    value: false,
    label: 'Nadpis otázky',
    description: 'Popis otázky',
    validators: [],
    required: false,
    quickInfo: false,
    shared: false,
    layout: {},
    options: 'Text na odsúhlasenie',
  };

  getDefaults(params = {}) {
    return {
      ...this.defaults,
      type: this.type,
      key: this.utilsService.generateId(),
      ...params,
    };
  }

  getServiceBlocks() {
    return [
      this.blockGallery.label(this.defaults.label),
      this.blockGallery.description(this.defaults.description),
      {
        type: 'textarea',
        key: 'options',
        label: 'Text na odsúhlasenie',
        value: this.defaults.options,
        validators: [
          { type: 'required', params: [] },
          { type: 'maxLength', params: [1500] },
        ],
        layout: { panel: 1 },
      },
      {
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
            label: 'Minimálny počet znakov',
          },
          {
            value: false,
            label: 'Maximálny počet znakov',
          },
          {
            value: false,
            label: 'Emailova adresa',
          },
        ],
      },
      this.blockGallery.layout(),
      this.blockGallery.quickinfo(),
      this.blockGallery.shared(),
    ];
  }
}
