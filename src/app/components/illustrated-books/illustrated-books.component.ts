import { AfterViewInit, Component } from '@angular/core';
import { LocalResourceService } from 'src/app/services/local-resource.service';

@Component({
  selector: 'app-illustrated-books',
  templateUrl: './illustrated-books.component.html',
  styleUrls: ['./illustrated-books.component.scss'],
})
export class IllustratedBooksComponent implements AfterViewInit {
  
  booksDescription: string;
  booksAsImg: string[][];

  constructor(private resourceService: LocalResourceService) {
    this.booksDescription = this.resourceService.booksDescription();
    this.booksAsImg = this.resourceService.getBooks();
  }

  ngAfterViewInit(): void {
    for (var i = 0; i < this.booksAsImg.length; i++) {
      document.getElementById('book'+i+'btn0')?.classList.add('active');
      document.getElementById('book'+i+'page0')?.classList.add('active');
    }
  }

}

