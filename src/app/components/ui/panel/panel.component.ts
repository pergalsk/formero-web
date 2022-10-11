import { Component, OnInit, Input } from '@angular/core';

const classMap = {
  PLAIN: 'panel-plain',
  BOXED: '',
  'BOXED|VIVID': 'panel-vivid',
  'BOXED|BORDER': 'panel-border',
};

const panelTypes = [
  '',
  'panel-plain',
  'panel-vivid',
  'panel-border',
  'panel-plain panel-border',
  'panel-vivid panel-border',
  'panel-text-minor',
  'panel-text-minor panel-plain',
  'panel-text-minor panel-vivid',
  'panel-text-minor panel-border',
];

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {
  @Input() type = 0;

  class = '';

  constructor() {}

  ngOnInit(): void {
    this.class = panelTypes[this.type] || panelTypes[0];
  }
}
