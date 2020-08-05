import { Component, Input, OnInit } from '@angular/core';
import { FormeroBlockText } from '../../Blocks/formero-block-text';

@Component({
  selector: 'app-formero-blocktext',
  templateUrl: './formero-blocktext.component.html',
  styleUrls: ['./formero-blocktext.component.scss'],
})
export class FormeroBlocktextComponent implements OnInit {
  @Input() props: FormeroBlockText;

  constructor() {}

  ngOnInit(): void {}
}
