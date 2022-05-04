import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilenamePipe } from 'src/app/shared/filename.pipe';
import { HtmlSanitizePipe } from 'src/app/shared/html-sanitize.pipe';
import { SplitTextPipe } from 'src/app/shared/split-text.pipe';

import { CapabilitiesComponent } from './capabilities.component';

describe('CapabilitiesComponent', () => {
  let component: CapabilitiesComponent;
  let fixture: ComponentFixture<CapabilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapabilitiesComponent, FilenamePipe, SplitTextPipe, HtmlSanitizePipe ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapabilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
