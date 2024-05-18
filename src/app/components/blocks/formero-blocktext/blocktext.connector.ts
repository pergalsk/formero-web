import { inject, Injectable } from '@angular/core';
import { BlockGroupType } from '@app/schema/schema';
import { UtilsService } from '@services/utils.service';

@Injectable({ providedIn: 'root' })
export class BlocktextConnector {
  utilsService: UtilsService = inject(UtilsService);

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
        type: 'textbox',
        key: 'content',
        label: 'Text odstavca',
        value: this.defaults.content,
        validators: [{ type: 'maxLength', params: [5000] }],
        layout: { panel: 1 },
      },
    ];
  }
}
