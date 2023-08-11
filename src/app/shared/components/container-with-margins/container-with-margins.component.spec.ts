import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerWithMarginsComponent } from './container-with-margins.component';

describe('ContainerWithMarginsComponent', () => {
  let component: ContainerWithMarginsComponent;
  let fixture: ComponentFixture<ContainerWithMarginsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerWithMarginsComponent]
    });
    fixture = TestBed.createComponent(ContainerWithMarginsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
