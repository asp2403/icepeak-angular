import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAreaOrderComponent } from './work-area-order.component';

describe('WorkAreaOrderComponent', () => {
  let component: WorkAreaOrderComponent;
  let fixture: ComponentFixture<WorkAreaOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkAreaOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkAreaOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
