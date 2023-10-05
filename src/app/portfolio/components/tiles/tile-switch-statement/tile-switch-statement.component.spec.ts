import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TileSwitchStatementComponent } from './tile-switch-statement.component';

describe('TileSwitchStatementComponent', () => {
  let component: TileSwitchStatementComponent;
  let fixture: ComponentFixture<TileSwitchStatementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TileSwitchStatementComponent]
    });
    fixture = TestBed.createComponent(TileSwitchStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
