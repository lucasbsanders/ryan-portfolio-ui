import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { iImage } from 'src/app/shared/interfaces.const';
import { PageReadService } from './page-read.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectNavigationService {
  orderedProjectLinks: string[] = [];

  constructor(private pageService: PageReadService) {}

  public getOrderedProjectLinks(): Observable<string[]> {
    return this.pageService
      .getPageFromRoute('portfolio')
      .pipe(
        map(
          (pageData: any) =>
            (this.orderedProjectLinks = pageData.tiles[2].images
              .filter((image: iImage) => !image.hidden)
              .map((imgData: any) => imgData.url || imgData.link))
        )
      );
  }
}
