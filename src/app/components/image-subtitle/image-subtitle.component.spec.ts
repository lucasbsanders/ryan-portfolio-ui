import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSubtitleComponent } from './image-subtitle.component';

describe('ImageSubtitleComponent', () => {
  let component: ImageSubtitleComponent;
  let fixture: ComponentFixture<ImageSubtitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageSubtitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageSubtitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
