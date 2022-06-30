import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss'],
})
export class IndexPageComponent implements OnInit {
  formIds: number[] = [13405, 16498, 999];

  constructor() {}

  ngOnInit(): void {}
}
