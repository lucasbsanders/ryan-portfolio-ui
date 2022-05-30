import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowWidthAdjustComponent } from './row-width-adjust.component';

describe('RowWidthAdjustComponent', () => {
  let component: RowWidthAdjustComponent;
  let fixture: ComponentFixture<RowWidthAdjustComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RowWidthAdjustComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RowWidthAdjustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
