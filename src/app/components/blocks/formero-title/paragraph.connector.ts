import { inject, Injectable } from '@angular/core';
import { BlockGroupType } from '@app/schema/schema';
import { UtilsService } from '@services/utils.service';
import { BlocksGalleryService } from '@services/blocks-gallery.service';

@Injectable({ providedIn: 'root' })
export class ParagraphConnector {
  utilsService: UtilsService = inject(UtilsService);
  blockGallery: BlocksGalleryService = inject(BlocksGalleryService);

  private readonly type = 'paragraph';
  private readonly uiTitle = 'Odstavec';
  private readonly uiType = BlockGroupType.TEXT;
  private readonly uiOrder = 10;

  private readonly defaults = {
    key: '',
    order: 0,
    label: 'Nadpis odseku',
    description: 'Dlhší štrukturovaný text odseku.',
    layout: { panel: 1 },
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
      this.blockGallery.layout(1),
      this.blockGallery.validators(),
      this.blockGallery.quickinfo(),
      this.blockGallery.shared(),
    ];
  }

  transform(value: any) {
    return {
      ...value,
      layout: { panel: parseInt(value.layout, 10) ?? 1 },
    };
  }
}
