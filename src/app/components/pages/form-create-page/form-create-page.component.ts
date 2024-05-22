import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { UtilsService } from '@services/utils.service';
import { SchemaService } from '@services/schema.service';
import { FormComponent } from '@components/form/form.component';
import { BlockPaletteComponent } from '@components/ui/block-palette/block-palette.component';
import { DividerModule } from 'primeng/divider';
import { JsonPipe } from '@angular/common';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { FromCoreComponent } from '@components/form/from-core.component';
import { FormGroup } from '@angular/forms';
import { Connectors, SCHEMA_BLOCKS } from '@app/schema/schema-blocks-injection-token';
import { TextboxConnector } from '@components/blocks/formero-textbox/textbox.connector';
import { SchemaBlock } from '@app/schema/schema';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-create-page',
  standalone: true,
  imports: [
    FormComponent,
    BlockPaletteComponent,
    TabViewModule,
    CardModule,
    InputTextModule,
    InputTextareaModule,
    DividerModule,
    JsonPipe,
    InputSwitchModule,
    DropdownModule,
    ButtonModule,
    PanelModule,
    FromCoreComponent,
  ],
  template: `
    <div class="page">
      <div class="flx-row" style="height: 100%">
        <aside>
          <app-block-palette class="sticky" (action)="onAction($event)"></app-block-palette>
        </aside>

        <div class="flx-fill">
          <p-panel header="{{ previewFormOpt.title }}">
            <div class="form-wrapper flx-fill">
              <app-form
                [blocks]="previewFormOpt"
                [calculations]="null"
                [draggable]="true"
                [selectable]="true"
                (select)="onPreviewSelect($event)"
              />
            </div>
          </p-panel>
        </div>

        <aside>
          <p-card>
            <p-tabView [(activeIndex)]="serviceTabIndex">
              <p-tabPanel header="Formulár">
                <div class="flx-col gap-small">
                  <label for="form-title"><b>Názov formulára</b></label>
                  <small id="form-title-help"><em>Zobrazí sa v hornej časti formulára.</em></small>
                  <input
                    pInputText
                    type="text"
                    id="form-title"
                    aria-describedby="form-title-help"
                    value="{{ previewFormOpt.title }}"
                  />
                </div>

                <p-divider />

                <div class="flx-col gap-small">
                  <label for="form-batch"><b>Hromadné odosielanie</b></label>
                  <small id="form-batch-help"
                    ><em
                      >Ak je zapnuté, je možné odosielať viacero vyplnených formulárov naraz. Napr.
                      za skupinu ľudí, rodinu. Je možné označiť vstupy, ktorých hodnoty sa budú
                      medzi jednotlivými fromulármi zdieľať (napr. adresa).</em
                    ></small
                  >
                  <div class="flx-row gap-small" style="margin-top: 0.5rem;">
                    <p-inputSwitch id="form-batch"></p-inputSwitch>
                    <span>Hromadné odosielanie</span>
                  </div>
                </div>

                <p-divider />

                <div class="flx-col gap-small">
                  <label for="form-template"><b>Vzhľad</b></label>
                  <small id="form-title-help"
                    ><em
                      >Nastavenie vyzuálnej stránky formulára je možné vybrať z prednastavených
                      šablón.</em
                    ></small
                  >
                  <div class="flx-row gap-small" style="margin-top: 0.5rem;">
                    <p-dropdown
                      id="form-template"
                      [options]="formTemplates"
                      optionLabel="name"
                      placeholder="Vzhľad formulára"
                      class="flx-fill"
                    ></p-dropdown>
                  </div>
                </div>

                <p-divider />

                <div>
                  <div class="flx-col gap-small">
                    <label for="form-result"><b>Text po odoslaní</b></label>
                    <small id="result-text-help"
                      ><em>Zobrazí sa po úspešnom odoslaní fromulára.</em></small
                    >
                    <textarea
                      pInputTextarea
                      id="form-result"
                      rows="10"
                      aria-describedby="result-text-help"
                      >{{ previewFormOpt.successInfo }}</textarea
                    >
                  </div>
                </div>

                <p-divider />

                <p-button label="Pokročilé nastavenia formulára"></p-button>
              </p-tabPanel>

              <p-tabPanel header="Blok">
                @if (serviceFormBlocks.length) {
                  <app-form-core
                    [blocks]="serviceFormBlocks"
                    [formData]="serviceForm"
                    [displayFieldMessages]="displayFieldMessages"
                    [draggable]="false"
                    [selectable]="false"
                  />
                  <pre>{{ serviceForm?.getRawValue() | json }}</pre>
                } @else {
                  Pre zobrazenie možností kliknite na niektorý z pridaných blokov formulára.
                }
              </p-tabPanel>
            </p-tabView>
          </p-card>
        </aside>
      </div>
    </div>
  `,
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCreatePageComponent implements OnInit, OnDestroy {
  utilsService: UtilsService = inject(UtilsService);
  schemaService: SchemaService = inject(SchemaService);
  schemaBlocks: any = inject(SCHEMA_BLOCKS);
  changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);
  textboxConn = inject(TextboxConnector);

  serviceForm: FormGroup = this.schemaService.initEmptyForm();
  serviceFormBlocks = [];
  serviceFormSubscription: Subscription = null;

  stateStorage = {};
  serviceTabIndex = 0; // show first tab: global form settings
  selectedPreviewBlockKey: string | null = null;
  displayFieldMessages = true;

  previewFormOpt: any = {
    id: 0,
    title: 'Nový formulár_2024-04-13',
    successInfo: 'Formulár úspešne odoslaný!',
    calculationsId: null,
    options: {
      batch: true,
    },
    blocks: [],
  };

  formTemplates: { name: string; code: string }[] = [
    { name: 'Prednastavený', code: 'default' },
    { name: 'Moderný', code: 'modern' },
    { name: 'Klasický', code: 'classic' },
    { name: 'Jenoduchý', code: 'simple' },
    { name: 'Kontrastný svetlý', code: 'contrast-light' },
    { name: 'Kontrastný tmavý', code: 'contrast-dark' },
  ];

  ngOnInit(): void {
    this.addPreviewBlock(this.textboxConn.getDefaults());
  }

  ngOnDestroy(): void {
    if (this.serviceFormSubscription) {
      this.serviceFormSubscription.unsubscribe();
      this.serviceFormSubscription = null;
    }
  }

  onAction(defaultProps: any): void {
    this.addPreviewBlock(defaultProps);
  }

  addPreviewBlock(defaultProps: any): void {
    const { blocks } = this.previewFormOpt;

    const selectedIndex = blocks.findIndex(
      (block: any) => block.key === this.selectedPreviewBlockKey,
    );

    const newIndex = selectedIndex > -1 ? selectedIndex + 1 : blocks.length;
    blocks.splice(newIndex, 0, { ...defaultProps });

    this.previewFormOpt = { ...this.previewFormOpt, blocks: structuredClone(blocks) };

    // TODO: rethink:
    this.changeDetector.detectChanges(); // manually trigger change detection
  }

  onPreviewSelect({ type, key }): void {
    if (this.selectedPreviewBlockKey === key) {
      // already selected block
      return;
    }

    this.selectedPreviewBlockKey = key;

    if (this.serviceFormSubscription) {
      this.serviceFormSubscription.unsubscribe();
      this.serviceFormSubscription = null;
    }

    this.serviceTabIndex = 1; // show tab with block settings

    const connector = this.getConnector(type);

    if (!this.isFunction(connector?.getServiceBlocks)) {
      this.serviceFormBlocks = [];
      return;
    }

    this.serviceFormBlocks = connector?.getServiceBlocks();
    this.serviceForm = this.schemaService.initEmptyForm();

    // TODO: investigate and do it the Angular way
    this.changeDetector.detectChanges(); // manually trigger change detection
    setTimeout(() => {
      if (this.stateStorage[key]) {
        this.serviceForm.setValue(this.stateStorage[key]);
      }
      this.serviceFormSubscription = this.serviceForm.valueChanges.subscribe(() =>
        this.serviceFormValueChanges(key, connector),
      );
    });
  }

  serviceFormValueChanges(key: string, connector: any): void {
    const rawValue = this.serviceForm.getRawValue();
    this.stateStorage[key] = rawValue;

    if (typeof connector.transform === 'function') {
      const blocks = this.previewFormOpt.blocks;
      const blockIndex = blocks.findIndex((block: any) => block.key === key);

      if (blockIndex > -1) {
        blocks[blockIndex] = {
          ...blocks[blockIndex],
          ...connector.transform(rawValue),
        };

        this.previewFormOpt = {
          ...this.previewFormOpt,
          blocks: structuredClone(blocks),
        };
      }
      this.changeDetector.detectChanges(); // manually trigger change detection
    }

    // const { label, description } = rawValue;
    // this.previewFormOpt.blocks[0].label = label;
    // this.previewFormOpt.blocks[0].description = description;
  }

  getConnector(blockType: SchemaBlock): any {
    return this.schemaBlocks.find(({ type }) => type === blockType);
  }

  isFunction(value: any): boolean {
    return typeof value === 'function';
  }
}
