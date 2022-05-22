import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VimeoVideoComponent } from './vimeo-video.component';

describe('VimeoVideoComponent', () => {
  let component: VimeoVideoComponent;
  let fixture: ComponentFixture<VimeoVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VimeoVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VimeoVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
