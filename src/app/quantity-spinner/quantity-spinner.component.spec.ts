import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantitySpinnerComponent } from './quantity-spinner.component';

describe('QuantitySpinnerComponent', () => {
  let component: QuantitySpinnerComponent;
  let fixture: ComponentFixture<QuantitySpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuantitySpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantitySpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
