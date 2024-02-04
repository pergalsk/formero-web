import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormeroTextboxComponent } from './formero-textbox.component';

describe('FormeroTextboxComponent', () => {
  let component: FormeroTextboxComponent;
  let fixture: ComponentFixture<FormeroTextboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormeroTextboxComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormeroTextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
