import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AwsConnectService } from './aws-connect.service';

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

  constructor(private awsService: AwsConnectService) {}

  onResize(width: number) {
    if (width < 576) {
      this.colAdj = -1;
    } else {
      this.colAdj = 0;
    }
  }

  getMenuData(): Observable<any[]> {
    return of(this.staticData.menu);
  }

  getFooterData(): Observable<any> {
    return of(this.staticData.footer);
  }

  click() {
    this.awsService.putDynamoObjectByKey(this.staticData, 'route', this.staticDataKey, 'ryan-portfolio-pages').subscribe(data => console.log(data));
  }


}
