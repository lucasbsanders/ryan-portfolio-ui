import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullscreenMenuComponent } from './fullscreen-menu.component';

describe('FullscreenMenuComponent', () => {
  let component: FullscreenMenuComponent;
  let fixture: ComponentFixture<FullscreenMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullscreenMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullscreenMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
