import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { iImage, iPage } from 'src/app/shared/interfaces.const';
import { PageReadService } from './page-read.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectNavigationService {
  constructor(private pageService: PageReadService) {}

  public getOrderedProjectLinks(): Observable<string[]> {
    return this.getOrderedProjectImages().pipe(
      map((images) => images.map((imgData: any) => imgData.url || imgData.link))
    );
  }

  public getOrderedProjectImages(): Observable<iImage[]> {
    return this.pageService
      .getPageFromRoute('portfolio')
      .pipe(
        map((portfolioPageData: iPage | undefined) =>
          portfolioPageData?.tiles[2].images?.filter((image: iImage) => !image.hidden) ?? []
        )
      );
  }
}
