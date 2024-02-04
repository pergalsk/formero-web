import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormeroValidationComponent } from './formero-validation.component';

describe('FormeroValidationComponent', () => {
  let component: FormeroValidationComponent;
  let fixture: ComponentFixture<FormeroValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormeroValidationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormeroValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
