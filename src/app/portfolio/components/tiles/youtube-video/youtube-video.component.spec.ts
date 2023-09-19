import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeVideoComponent } from './youtube-video.component';

describe('YoutubeVideoComponent', () => {
  let component: YoutubeVideoComponent;
  let fixture: ComponentFixture<YoutubeVideoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YoutubeVideoComponent]
    });
    fixture = TestBed.createComponent(YoutubeVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
