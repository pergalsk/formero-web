import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBlocksComponent } from './form-blocks.component';

describe('FormBlocksComponent', () => {
  let component: FormBlocksComponent;
  let fixture: ComponentFixture<FormBlocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormBlocksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
