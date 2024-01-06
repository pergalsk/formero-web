import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithMenuLayoutComponent } from './with-menu-layout.component';

describe('WithMenuLayoutComponent', () => {
  let component: WithMenuLayoutComponent;
  let fixture: ComponentFixture<WithMenuLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithMenuLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WithMenuLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
