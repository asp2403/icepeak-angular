import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckGridComponent } from './check-grid.component';

describe('CheckGridComponent', () => {
  let component: CheckGridComponent;
  let fixture: ComponentFixture<CheckGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
