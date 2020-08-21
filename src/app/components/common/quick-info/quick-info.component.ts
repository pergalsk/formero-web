import {
  Component,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  EventEmitter,
} from '@angular/core';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-quick-info',
  templateUrl: './quick-info.component.html',
  styleUrls: ['./quick-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickInfoComponent implements OnChanges {
  @Input() items: any[];
  @Input() keys: string[];
  @Input() disabled: boolean = true;
  @Output() edit: EventEmitter<number> = new EventEmitter<number>();
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  reducedItems: any[] = [];

  constructor(private utilsService: UtilsService) {}

  handleEdit(index: number): void {
    this.edit.emit(index);
  }

  handleDelete(index: number): void {
    this.delete.emit(index);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.reducedItems = this.items.map((item) => {
      return this.utilsService.copyObjectByKeys(item, this.keys);
    });
  }

  keepOriginalOrder = (a) => a.key;
}
