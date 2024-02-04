import { Component, Input, OnInit } from '@angular/core';
import { FormeroBlockText } from '../../../Blocks';

@Component({
    selector: 'app-formero-blocktext',
    templateUrl: './formero-blocktext.component.html',
    styleUrls: ['./formero-blocktext.component.scss'],
    standalone: true,
})
export class FormeroBlocktextComponent implements OnInit {
  @Input() props: FormeroBlockText;

  constructor() {}

  ngOnInit(): void {}
}
