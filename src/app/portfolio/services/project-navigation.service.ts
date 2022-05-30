import { Injectable } from '@angular/core';
import { PageReadService } from './page-read.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectNavigationService {

  orderedProjects: string[] = [];

  constructor(private pageService: PageReadService) {
    this.pageService
      .getPageByRoute('portfolio')
      .subscribe(
        (pageData: any) =>
          (this.orderedProjects = pageData.tiles[1].images.map(
            (imgData: any) => imgData.link
          ))
      );
  }

}
