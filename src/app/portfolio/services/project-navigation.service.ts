import { Injectable } from '@angular/core';
import { PageReadService } from './page-read.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectNavigationService {
  orderedProjectLinks: string[] = [];

  constructor(private pageService: PageReadService) {
    this.pageService
      .getPageFromRoute('portfolio')
      .subscribe(
        (pageData: any) =>
          (this.orderedProjectLinks = pageData.tiles[2].images.map(
            (imgData: any) => imgData.url || imgData.link
          ))
      );
  }
}
