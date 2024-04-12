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
  ],
  template: `
    <div class="page">
      <div class="flx-row">
        <aside>
          <app-block-palette class="sticky" (action)="onAction($event)"></app-block-palette>
        </aside>

        <div class="flx-fill">
          <div class="form-wrapper flx-fill">
            <app-form [blocks]="formBlocksSet" />
          </div>
        </div>

        <aside>
          <p-card class="sticky">
            <p-tabView>
              <p-tabPanel header="Formulár">
                <div class="flx-col gap-0">
                  <div class="flx-col gap-small">
                    <label for="form-title"><b>Nadpis</b></label>
                    <small id="form-title-help"
                      ><em>Zobrazí sa v hornej časti formulára.</em></small
                    >
                    <input
                      pInputText
                      type="text"
                      id="form-title"
                      aria-describedby="form-title-help"
                      value="{{ formBlocksSet.title }}"
                    />
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
                </div>
              </p-tabPanel>

              <p-tabPanel header="Vstup">
                Tu budú zobrazené možnosti pre každú časť formulára. Stačí len vyplniť a nastaviť
                požadované texty a vzhľad. Zmena sa prejaví okamžite.
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
    title: 'Nový formulár',
    successInfo: 'Formulár úspešne odoslaný!',
    validators: null,
    calculationsId: null,
    options: {
      batch: true,
    },
    blocks: [new FormeroQuestionTextbox()], // todo: new key as UUID
  };

  onAction(classNameFn): void {
    const instance = new classNameFn({ key: this.utilsService.uuid() });

    this.formBlocksSet = {
      ...this.formBlocksSet,
      blocks: [...this.formBlocksSet.blocks, instance],
    };
  }
}
