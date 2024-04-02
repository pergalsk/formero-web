import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { JsonPipe, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableModule, TableRowSelectEvent } from 'primeng/table';
import { SchemaService, SchemasListItem } from '@services/schema.service';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-forms-page',
  standalone: true,
  imports: [TableModule, NgFor, JsonPipe],
  template: `
    <div class="page">
      <div class="screen-title">Zoznam formulárov</div>
      <p-table
        [columns]="cols"
        [value]="formsList"
        (onRowSelect)="onRowSelect($event)"
        selectionMode="single"
        styleClass="p-datatable-striped rounded-table"
      >
        <ng-template pTemplate="header" let-columns>
          <tr>
            <th *ngFor="let col of columns">
              {{ col.header }}
            </th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-rowData let-columns="columns">
          <tr [pSelectableRow]="rowData">
            <td *ngFor="let col of columns">
              {{ rowData[col.field] }}
            </td>
          </tr>
        </ng-template>
      </p-table>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormsPageComponent implements OnInit, OnDestroy {
  router: Router = inject(Router);
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  schemaService: SchemaService = inject(SchemaService);

  formsList: SchemasListItem[] = [];
  subscription: Subscription;

  cols: Column[] = [
    { field: 'title', header: 'Názov' },
    { field: 'created_at', header: 'Dátum vytvorenia' },
    { field: 'user_id', header: 'Používateľ' },
    { field: 'status', header: 'Stav' },
    { field: 'batch', header: 'Hromadné posielanie' },
    { field: 'calculation_id', header: 'Kalkulácie' },
    { field: 'hash', header: 'Hash' },
  ];

  ngOnInit(): void {
    this.subscription = this.schemaService
      .loadAllFormSchemas()
      .subscribe((list: SchemasListItem[]) => {
        this.formsList = [...list];
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this?.subscription?.unsubscribe();
  }

  onRowSelect($event: TableRowSelectEvent) {
    const { id } = $event?.data;
    this.router.navigate(['/form', id]);
  }
}
