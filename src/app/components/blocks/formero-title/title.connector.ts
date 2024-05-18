import { inject, Injectable } from '@angular/core';
import { BlockGroupType } from '@app/schema/schema';
import { UtilsService } from '@services/utils.service';

@Injectable({ providedIn: 'root' })
export class TitleConnector {
  utilsService: UtilsService = inject(UtilsService);

  private readonly type = 'title';
  private readonly uiTitle = 'Nadpis sekcie';
  private readonly uiType = BlockGroupType.TEXT;
  private readonly uiOrder = 10;

  private readonly defaults = {
    key: '',
    order: 0,
    content: 'Text nadpisu',
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
        label: 'Titulok',
        value: this.defaults.content,
        validators: [{ type: 'maxLength', params: [50] }],
        layout: { panel: 1 },
      },
    ];
  }
}
