import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilenamePipe } from 'src/app/shared/filename.pipe';
import { SplitTextPipe } from 'src/app/shared/split-text.pipe';

import { IllustratedBooksComponent } from './illustrated-books.component';

describe('IllustratedBooksComponent', () => {
  let component: IllustratedBooksComponent;
  let fixture: ComponentFixture<IllustratedBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IllustratedBooksComponent, FilenamePipe, SplitTextPipe ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IllustratedBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
