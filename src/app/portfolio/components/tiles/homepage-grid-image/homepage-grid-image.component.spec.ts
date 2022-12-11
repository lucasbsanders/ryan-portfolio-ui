import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageGridImageComponent } from './homepage-grid-image.component';

describe('HomepageGridImageComponent', () => {
  let component: HomepageGridImageComponent;
  let fixture: ComponentFixture<HomepageGridImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageGridImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageGridImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
