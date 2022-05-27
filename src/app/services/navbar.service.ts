import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PageReadService } from './page-read.service';
import { PageType } from './pages.const';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {

  menuOpen: boolean = false;
  isAtTop: boolean = true;
  isSmallScreen = false;
  isMediumScreen = false;
  isHomepage = false;

  constructor(private pageService: PageReadService) {}

  onResize(width: number) {
    this.isSmallScreen = width < 576;
    this.isMediumScreen = width < 768;
  }

  setRoute(route: string) {
    this.isHomepage = route.localeCompare('portfolio') === 0;
  }

  getMenuData(): Observable<any[]> {
    return this.pageService
      .getPageByRoute('menu', PageType.Static)
      .pipe(map((response) => response.data));
  }

  getFooterData(): Observable<any> {
    return this.pageService
      .getPageByRoute('footer', PageType.Static)
      .pipe(map((response) => response.data));
  }
}
