import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromCoreComponent } from './from-core.component';

describe('FromCoreComponent', () => {
  let component: FromCoreComponent;
  let fixture: ComponentFixture<FromCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FromCoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FromCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
