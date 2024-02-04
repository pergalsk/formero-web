import {
  Component,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  EventEmitter,
} from '@angular/core';
import { UtilsService } from '@services/utils.service';
import { NgIf, NgFor, CurrencyPipe, KeyValuePipe } from '@angular/common';

@Component({
    selector: 'app-quick-info',
    templateUrl: './quick-info.component.html',
    styleUrls: ['./quick-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgIf,
        NgFor,
        CurrencyPipe,
        KeyValuePipe,
    ],
})
export class QuickInfoComponent implements OnChanges {
  @Input() items: any[];
  @Input() keys: string[];
  @Input() disabled = true;
  @Input() displaySum = false;
  @Output() edit: EventEmitter<number> = new EventEmitter<number>();
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  reducedItems: any[] = [];
  total: 0;

  constructor(private utilsService: UtilsService) {}

  handleEdit(index: number): void {
    this.edit.emit(index);
  }

  handleDelete(index: number): void {
    this.delete.emit(index);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.total = 0;
    this.reducedItems = this.items.map((item) => {
      this.total += item.sum || 0;
      return {
        val: this.utilsService.copyObjectByKeys(item.val, this.keys),
        sum: item.sum,
      };
    });
  }

  keepOriginalOrder = (a) => a.key;
}
