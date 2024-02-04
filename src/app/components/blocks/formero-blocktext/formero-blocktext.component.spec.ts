import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormeroBlocktextComponent } from './formero-blocktext.component';

describe('FormeroBlocktextComponent', () => {
  let component: FormeroBlocktextComponent;
  let fixture: ComponentFixture<FormeroBlocktextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [FormeroBlocktextComponent],
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormeroBlocktextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
