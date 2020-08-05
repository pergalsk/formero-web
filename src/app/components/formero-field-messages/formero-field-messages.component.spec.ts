import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormeroFieldMessagesComponent } from './formero-field-messages.component';

describe('FormeroFieldMessagesComponent', () => {
  let component: FormeroFieldMessagesComponent;
  let fixture: ComponentFixture<FormeroFieldMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormeroFieldMessagesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormeroFieldMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
