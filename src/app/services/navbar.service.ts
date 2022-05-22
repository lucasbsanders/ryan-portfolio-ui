import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PageReadService } from './page-read.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  menuOpen: boolean = false;
  isAtTop: boolean = true;
  colAdj = 0; // global column adjust for mobile
  isHomepage = false;

  constructor(private pageService: PageReadService) {}

  onResize(width: number) {
    if (width < 576) {
      this.colAdj = -1;
    } else {
      this.colAdj = 0;
    }
  }

  setRoute(route: string) {
    this.isHomepage = route.localeCompare('portfolio') === 0;
  }

  getMenuData(): Observable<any[]> {
    return this.pageService.getPageByRoute(environment.staticDataKey).pipe(
      map(staticData => staticData.menu));
  }

  getFooterData(): Observable<any> {
    return this.pageService.getPageByRoute(environment.staticDataKey).pipe(
      map(staticData => staticData.footer));
  }

}
