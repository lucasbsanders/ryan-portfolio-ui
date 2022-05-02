import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSquareComponent } from './image-square.component';

describe('ImageSquareComponent', () => {
  let component: ImageSquareComponent;
  let fixture: ComponentFixture<ImageSquareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageSquareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
