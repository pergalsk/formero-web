import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { SCHEMA_BLOCKS } from '@app/schema/schema-blocks-injection-token';
import { MenuItem } from 'primeng/api';
import { JsonPipe } from '@angular/common';
import { BlockGroupType } from '@app/schema/schema';

const blockTypeNamesMap = {
  [BlockGroupType.TEXT]: 'Text',
  [BlockGroupType.CONTROL]: 'Vstupy',
  [BlockGroupType.MISC]: 'Rôzne',
};

@Component({
  selector: 'app-block-palette',
  standalone: true,
  imports: [MenuModule, JsonPipe],
  template: `<p-menu [model]="menuItems" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockPaletteComponent {
  @Output() action: EventEmitter<string> = new EventEmitter<string>();

  // todo: type all props in this class

  schemaBlocks = inject(SCHEMA_BLOCKS); // todo type
  menuItems: MenuItem[] = this.prepareMenu(this.schemaBlocks);

  prepareMenu(schemaBlocks): MenuItem[] {
    const groups = schemaBlocks.sort(this.sortBy_uiOrder).reduce(this.collectBy_UiType, {});
    const arr: MenuItem = Object.keys(groups).map(this.mapMenuSections(groups));
    return arr.flat();
  }

  itemAction(defaultProps): void {
    this.action.emit(defaultProps);
  }

  collectBy_UiType(acc, connector) {
    if (!acc[connector.uiType]) {
      acc[connector.uiType] = [connector];
    } else {
      acc[connector.uiType].push(connector);
    }
    return acc;
  }

  sortBy_uiOrder(connectorA, connectorB): number {
    return connectorA.uiOrder - connectorB.uiOrder;
  }

  mapMenuSections(groups) {
    return (uiType: BlockGroupType, index: number) => {
      const result = [
        {
          label: blockTypeNamesMap[uiType],
          items: groups[uiType].map(this.mapMenuSectionItems.bind(this)),
        },
      ];
      return index ? [{ separator: true }, ...result] : result;
    };
  }

  mapMenuSectionItems(connector) {
    return {
      label: connector.uiTitle,
      icon: 'pi pi-box',
      command: () => this.itemAction(connector.getDefaults()),
    };
  }
}
