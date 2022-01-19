import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormeroTitleComponent } from './formero-title.component';

describe('FormeroTitleComponent', () => {
  let component: FormeroTitleComponent;
  let fixture: ComponentFixture<FormeroTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormeroTitleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormeroTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
