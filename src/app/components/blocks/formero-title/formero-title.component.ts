import { Component, Input, OnInit } from '@angular/core';
import { FormeroBlockTitle } from '../../../Blocks';

@Component({
  selector: 'app-formero-title',
  templateUrl: './formero-title.component.html',
  styleUrls: ['./formero-title.component.scss'],
  standalone: true,
})
export class FormeroTitleComponent implements OnInit {
  @Input() props: FormeroBlockTitle;

  constructor() {}

  ngOnInit(): void {}
}
