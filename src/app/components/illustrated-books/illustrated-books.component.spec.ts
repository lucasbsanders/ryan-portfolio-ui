import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IllustratedBooksComponent } from './illustrated-books.component';

describe('IllustratedBooksComponent', () => {
  let component: IllustratedBooksComponent;
  let fixture: ComponentFixture<IllustratedBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IllustratedBooksComponent ]
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
