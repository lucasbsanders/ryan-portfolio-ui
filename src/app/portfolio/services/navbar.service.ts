import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PageType } from 'src/app/shared/enums.const';
import { PageReadService } from './page-read.service';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  isAtTop: boolean = true;
  isHomepage: boolean = false;
  isSmallScreen: boolean = false;
  isMediumScreen: boolean = false;

  set menuOpen(value: boolean) {
    this._menuOpen = value;
    if (this._menuOpen) {
      document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    } else {
      document.getElementsByTagName('body')[0].style.overflow = 'auto';
    }
  }

  get menuOpen(): boolean {
    return this._menuOpen;
  }
  private _menuOpen: boolean = false;

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
      .getPageFromRoute('__menu', PageType.Static)
      .pipe(map((response) => response?.['data']));
  }

  getFooterData(): Observable<any> {
    return this.pageService
      .getPageFromRoute('__footer')
      .pipe(map((response) => response?.['data']));
  }
}
