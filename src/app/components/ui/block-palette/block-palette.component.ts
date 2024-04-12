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

  itemAction(classNameFn) {
    this.action.emit(classNameFn);
  }

  collectBy_UiType(acc, classNameFn) {
    if (!acc[classNameFn.uiType]) {
      acc[classNameFn.uiType] = [classNameFn];
    } else {
      acc[classNameFn.uiType].push(classNameFn);
    }
    return acc;
  }

  sortBy_uiOrder(classNameFnA, classNameFnB) {
    return classNameFnA.uiOrder - classNameFnB.uiOrder;
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

  mapMenuSectionItems(classNameFn) {
    return {
      label: classNameFn.uiTitle,
      icon: 'pi pi-box',
      command: () => this.itemAction(classNameFn),
    };
  }
}
