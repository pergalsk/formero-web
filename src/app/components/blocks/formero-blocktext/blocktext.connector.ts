import { inject, Injectable } from '@angular/core';
import { BlockGroupType } from '@app/schema/schema';
import { UtilsService } from '@services/utils.service';
import { BlocksGalleryService } from '@services/blocks-gallery.service';

@Injectable({ providedIn: 'root' })
export class BlocktextConnector {
  utilsService: UtilsService = inject(UtilsService);
  blockGallery: BlocksGalleryService = inject(BlocksGalleryService);

  private readonly type = 'blocktext';
  private readonly uiTitle = 'Odstavec';
  private readonly uiType = BlockGroupType.TEXT;
  private readonly uiOrder = 20;

  private readonly defaults = {
    key: '',
    order: 0,
    content: 'Blok textu',
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
      {
        type: 'textarea',
        key: 'content',
        label: 'Text odstavca',
        value: this.defaults.content,
        validators: [{ type: 'maxLength', params: [5000] }],
        layout: { panel: 1 },
      },
      this.blockGallery.layout(1),
    ];
  }

  transform(value: any) {
    return {
      ...value,
      layout: { panel: parseInt(value.layout, 10) ?? 1 },
    };
  }
}
