import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseModelComponent } from './warehouse-model.component';

describe('WarehouseModelComponent', () => {
  let component: WarehouseModelComponent;
  let fixture: ComponentFixture<WarehouseModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
