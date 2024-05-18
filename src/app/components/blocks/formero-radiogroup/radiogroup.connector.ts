import { inject, Injectable } from '@angular/core';
import { BlockGroupType } from '@app/schema/schema';
import { BlocksGalleryService } from '@services/blocks-gallery.service';
import { UtilsService } from '@services/utils.service';

@Injectable({ providedIn: 'root' })
export class RadiogroupConnector {
  blockGallery: BlocksGalleryService = inject(BlocksGalleryService);
  utilsService: UtilsService = inject(UtilsService);

  private readonly type = 'radiogroup';
  private readonly uiTitle = 'Jedna voľba z viacerých';
  private readonly uiType = BlockGroupType.CONTROL;
  private readonly uiOrder = 70;

  private readonly defaults = {
    key: '',
    order: 0,
    value: 'val1',
    label: 'Nadpis otázky',
    description: 'Popis otázky',
    validators: [],
    required: false,
    quickInfo: false,
    shared: false,
    layout: {},
    options: [
      {
        key: 'key1',
        disabled: false,
        value: 'val1',
        label: 'Odpoveď 1',
      },
      {
        key: 'key2',
        disabled: false,
        value: 'val2',
        label: 'Odpoveď 2',
      },
    ],
  };

  getDefaults(params = {}) {
    return {
      ...this.defaults,
      type: this.type,
      key: this.utilsService.uuid(),
      ...params,
    };
  }

  getServiceBlocks() {
    return [
      this.blockGallery.label(this.defaults.label),
      this.blockGallery.description(this.defaults.description),
      this.blockGallery.layout(),
      this.blockGallery.quickinfo(),
      this.blockGallery.shared(),
    ];
  }
}
