import { AfterViewInit, Component, OnInit } from '@angular/core';
import { book1, booksText } from 'src/app/shared/LocalData/BrandData';

@Component({
  selector: 'app-illustrated-books',
  templateUrl: './illustrated-books.component.html',
  styleUrls: ['./illustrated-books.component.scss'],
})
export class IllustratedBooksComponent implements AfterViewInit, OnInit {
  booksText = booksText;

  books = [book1, book1];

  constructor() {}

  ngAfterViewInit(): void {
    for (var i = 0; i < this.books.length; i++) {
      document.getElementById('book'+i+'btn0')?.classList.add('active');
      document.getElementById('book'+i+'page0')?.classList.add('active');
    }
  }

  ngOnInit(): void {}

}

