import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormeroRadiogroupComponent } from './formero-radiogroup.component';

describe('FormeroRadiogroupComponent', () => {
  let component: FormeroRadiogroupComponent;
  let fixture: ComponentFixture<FormeroRadiogroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormeroRadiogroupComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormeroRadiogroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
