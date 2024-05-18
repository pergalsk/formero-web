import { inject, Injectable } from '@angular/core';
import { BlockGroupType } from '@app/schema/schema';
import { UtilsService } from '@services/utils.service';

@Injectable({ providedIn: 'root' })
export class ValidationConnector {
  utilsService: UtilsService = inject(UtilsService);

  private readonly type = 'validation';
  private readonly uiTitle = 'Validácia';
  private readonly uiType = BlockGroupType.MISC;
  private readonly uiOrder = 90;

  private readonly defaults = {
    key: '',
    order: 0,
    validators: [],
    layout: {},
  };

  getDefaults(params = {}) {
    return {
      ...this.defaults,
      type: this.type,
      key: this.utilsService.generateId(),
      ...params,
    };
  }
}
