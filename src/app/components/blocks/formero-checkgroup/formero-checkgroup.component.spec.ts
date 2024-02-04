import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormeroCheckgroupComponent } from './formero-checkgroup.component';

describe('FormeroCheckgroupComponent', () => {
  let component: FormeroCheckgroupComponent;
  let fixture: ComponentFixture<FormeroCheckgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormeroCheckgroupComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormeroCheckgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
