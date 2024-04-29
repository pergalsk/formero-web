import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { UtilsService } from '@services/utils.service';
import { FormBlocksSet } from '@services/schema.service';
import { FormeroQuestionTextbox } from '@app/Question';
import { FormComponent } from '@components/form/form.component';
import { BlockPaletteComponent } from '@components/ui/block-palette/block-palette.component';
import { DividerModule } from 'primeng/divider';
import { JsonPipe } from '@angular/common';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';

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
  ],
  template: `
    <div class="page">
      <div class="flx-row">
        <aside>
          <app-block-palette class="sticky" (action)="onAction($event)"></app-block-palette>
        </aside>

        <div class="flx-fill">
          <p-panel header="{{ formBlocksSet.title }}">
            <div class="form-wrapper flx-fill">
              <app-form [blocks]="formBlocksSet" [calculations]="null" [draggable]="true" />
            </div>
          </p-panel>
        </div>

        <aside>
          <p-card class="">
            <p-tabView>
              <p-tabPanel header="Formulár">
                <div class="flx-col gap-small">
                  Globálne nastavenia formulára sa zobrazia po kliknutí na tlačidlo nastavenia. Pre
                  zobrazenie nastavení jednotlivých blokov, je potrebné kliknúť na príslušný blok.
                </div>

                <p-divider />

                <div class="flx-col gap-small">
                  <label for="form-title"><b>Názov</b></label>
                  <small id="form-title-help"><em>Zobrazí sa v hornej časti formulára.</em></small>
                  <input
                    pInputText
                    type="text"
                    id="form-title"
                    aria-describedby="form-title-help"
                    value="{{ formBlocksSet.title }}"
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
                      >{{ formBlocksSet.successInfo }}</textarea
                    >
                  </div>
                </div>

                <p-divider />

                <p-button label="Pokročilé nastavenia formulára"></p-button>
              </p-tabPanel>

              <p-tabPanel header="Blok">
                Tu budú zobrazené možnosti pre každú časť formulára. Stačí len vyplniť a nastaviť
                požadované texty a vzhľad. Zmena sa prejaví okamžite.

                <p-divider />

                <pre>{{ formBlocksSet | json }}</pre>
              </p-tabPanel>
            </p-tabView>
          </p-card>
        </aside>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCreatePageComponent {
  utilsService: UtilsService = inject(UtilsService);

  formBlocksSet: FormBlocksSet = {
    id: 0,
    title: 'Nový formulár_2024-04-13',
    successInfo: 'Formulár úspešne odoslaný!',
    calculationsId: null,
    options: {
      batch: true,
    },
    blocks: [new FormeroQuestionTextbox({ key: this.utilsService.uuid() })], // todo: new key as UUID
  };

  formTemplates: { name: string; code: string }[] = [
    { name: 'Prednastavený', code: 'default' },
    { name: 'Moderný', code: 'modern' },
    { name: 'Klasický', code: 'classic' },
    { name: 'Jenoduchý', code: 'simple' },
    { name: 'Kontrastný svetlý', code: 'contrast-light' },
    { name: 'Kontrastný tmavý', code: 'contrast-dark' },
  ];

  onAction(classNameFn): void {
    const instance = new classNameFn({ key: this.utilsService.uuid() });

    this.formBlocksSet = {
      ...this.formBlocksSet,
      blocks: [...this.formBlocksSet.blocks, instance],
    };
  }
}
