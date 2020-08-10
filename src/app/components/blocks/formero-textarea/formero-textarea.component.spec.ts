import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormeroTextareaComponent } from './formero-textarea.component';

describe('FormeroTextareaComponent', () => {
  let component: FormeroTextareaComponent;
  let fixture: ComponentFixture<FormeroTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormeroTextareaComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormeroTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
