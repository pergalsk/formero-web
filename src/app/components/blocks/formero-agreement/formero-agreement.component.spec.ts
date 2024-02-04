import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormeroAgreementComponent } from './formero-agreement.component';

describe('FormeroAgreementComponent', () => {
  let component: FormeroAgreementComponent;
  let fixture: ComponentFixture<FormeroAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormeroAgreementComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormeroAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
