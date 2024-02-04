import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormeroDropdownComponent } from './formero-dropdown.component';

describe('FormeroDropdownComponent', () => {
  let component: FormeroDropdownComponent;
  let fixture: ComponentFixture<FormeroDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormeroDropdownComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormeroDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
