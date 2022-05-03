import { AfterViewInit, Component } from '@angular/core';
import { ResourcePathsService } from 'src/app/services/resource-paths.service';

@Component({
  selector: 'app-illustrated-books',
  templateUrl: './illustrated-books.component.html',
  styleUrls: ['./illustrated-books.component.scss'],
})
export class IllustratedBooksComponent implements AfterViewInit {
  
  booksText = this.resources.booksDescription();
  books = this.resources.getBooks();

  constructor(private resources: ResourcePathsService) {}

  ngAfterViewInit(): void {
    for (var i = 0; i < this.books.length; i++) {
      document.getElementById('book'+i+'btn0')?.classList.add('active');
      document.getElementById('book'+i+'page0')?.classList.add('active');
    }
  }

}

