import { Component, Input, OnInit } from '@angular/core';
import { FormeroBlockTitle } from '../../Blocks/formero-block-title';

@Component({
  selector: 'app-formero-title',
  templateUrl: './formero-title.component.html',
  styleUrls: ['./formero-title.component.scss'],
})
export class FormeroTitleComponent implements OnInit {
  @Input() props: FormeroBlockTitle;

  constructor() {}

  ngOnInit(): void {}
}
