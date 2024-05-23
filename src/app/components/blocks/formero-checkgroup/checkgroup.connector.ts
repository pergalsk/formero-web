import { inject, Injectable } from '@angular/core';
import { BlockGroupType } from '@app/schema/schema';
import { BlocksGalleryService } from '@services/blocks-gallery.service';
import { UtilsService } from '@services/utils.service';

@Injectable({ providedIn: 'root' })
export class CheckgroupConnector {
  blockGallery: BlocksGalleryService = inject(BlocksGalleryService);
  utilsService: UtilsService = inject(UtilsService);

  private readonly type = 'checkgroup';
  private readonly uiTitle = 'Viacero možností';
  private readonly uiType = BlockGroupType.CONTROL;
  private readonly uiOrder = 50;

  private readonly defaults = {
    key: '',
    order: 0,
    value: [],
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
        value: false,
        label: 'Odpoveď 1',
        disabled: false,
      },
      {
        key: 'key2',
        value: false,
        label: 'Odpoveď 2',
        disabled: false,
      },
    ],
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
      this.blockGallery.layout(),
      this.blockGallery.validators(),
      this.blockGallery.quickinfo(),
      this.blockGallery.shared(),
    ];
  }

  transform(value: any) {
    return {
      ...value,
      layout: { panel: parseInt(value.layout, 10) ?? 2 },
      validators: value.validators
        .map((flag: boolean, index: number) => {
          return (
            flag &&
            [
              { type: 'required', params: [] },
              { type: 'minLength', params: [3] },
              { type: 'maxLength', params: [1500] },
              { type: 'emailPattern', params: [] },
            ][index]
          );
        })
        .filter(Boolean),
    };
  }
}
