import { Component, OnInit, Input } from '@angular/core';
import { NgClass } from '@angular/common';

const classMap = {
  PLAIN: 'panel-plain',
  BOXED: '',
  'BOXED|VIVID': 'panel-vivid',
  'BOXED|BORDER': 'panel-border',
};

const panelTypes = {
  0: '',
  1: 'panel-plain',
  2: 'panel-vivid',
  3: 'panel-border',
  4: 'panel-plain panel-border',
  5: 'panel-vivid panel-border',
  6: 'panel-text-minor',
  7: 'panel-text-minor panel-plain',
  8: 'panel-text-minor panel-vivid',
  9: 'panel-text-minor panel-border',
};

@Component({
  selector: 'app-panel',
  template: `
    <section
      class="panel"
      [ngClass]="class"
      [class.panel-selectable]="selectable"
      [class.panel-selected]="selectable && selected"
    >
      <ng-content></ng-content>
    </section>
  `,
  standalone: true,
  imports: [NgClass],
})
export class PanelComponent implements OnInit {
  @Input() type = 0;
  @Input() classList = '';
  @Input() selectable = false;
  @Input() selected = false;

  class = '';

  ngOnInit(): void {
    this.class = [panelTypes[this.type] || panelTypes[0], this.classList].join(' ');
  }
}
