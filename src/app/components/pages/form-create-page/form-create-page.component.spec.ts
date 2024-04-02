import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreatePageComponent } from './form-create-page.component';

describe('FormCreatePageComponent', () => {
  let component: FormCreatePageComponent;
  let fixture: ComponentFixture<FormCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCreatePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
