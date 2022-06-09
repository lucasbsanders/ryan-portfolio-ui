import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderScrollComponent } from './order-scroll.component';

describe('OrderScrollComponent', () => {
  let component: OrderScrollComponent;
  let fixture: ComponentFixture<OrderScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderScrollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
