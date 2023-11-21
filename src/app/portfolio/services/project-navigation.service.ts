import { Injectable } from '@angular/core';
import { PageReadService } from './page-read.service';
import { iImage } from 'src/app/shared/interfaces.const';

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
          (this.orderedProjectLinks = pageData.tiles[2].images
            .filter((image: iImage) => !image.hidden)
            .map((imgData: any) => imgData.url || imgData.link))
      );
  }
}
