import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { AwsConnectService } from './aws-connect.service';
import { PageReadService } from './page-read.service';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private _menuOpen: boolean = false;
  public get menuOpen(): boolean {
    return this._menuOpen;
  }
  public set menuOpen(isOpen: boolean) {
    // if (isOpen) {
    //   document.getElementById('navbar-parent')?.classList.add("sticky-top");
    // }
    // else {
    //   document.getElementById('navbar-parent')?.classList.remove("sticky-top");
    // }
    //document.body.style.overflowY = isOpen ? 'hidden' : 'auto';
    this._menuOpen = isOpen;
  }

  isAtTop: boolean = true;

  colAdj = 0; // global column adjust for mobile

  staticDataKey = 'PorfolioStaticData';

  staticData = {
    route: this.staticDataKey,
    menu: [
      {title: 'Services', route: '/services'},
      {title: 'Portfolio', route: '/'},
      {title: 'About Me', route: '/about'},
      {title: 'Illustrated Books', route: '/books'},
      {title: 'Video Reel', url: 'https://duckduckgo.com/'},
    ],
    footer: {
      resume: 'https://duckduckgo.com/',
      linkedin: 'https://duckduckgo.com/',
      email: 'mailto:xfennessey@gmail.com',
    }
  };

  constructor(private awsService: AwsConnectService,
    private pageService: PageReadService) {}

  onResize(width: number) {
    if (width < 576) {
      this.colAdj = -1;
    } else {
      this.colAdj = 0;
    }
  }

  getMenuData(): Observable<any[]> {
    return this.pageService.getPageByRoute(this.staticDataKey).pipe(
      map(staticData => staticData.menu));
  }

  getFooterData(): Observable<any> {
    return this.pageService.getPageByRoute(this.staticDataKey).pipe(
      map(staticData => staticData.footer));
  }

}
