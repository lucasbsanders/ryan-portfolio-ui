import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { iPage } from 'src/app/shared/interfaces.const';
import { environment } from 'src/environments/environment';
import { PageType } from '../../shared/enums.const';

@Injectable({
  providedIn: 'root',
})
export class PageReadService {
  private _pages: iPage[] = [];
  private _pageSessionKey: string = 'RYAN_PORTFOLIO_PAGES';

  constructor(private http: HttpClient) {
    this.getPagesFromClosestSource().subscribe();
  }

  /**
   * Returns an iPage web page (within an observable) for a particular route input
   * @param route the unique name for a particular route in the site
   * @param type optional page type parameter that filters page list before searching for the route
   * @returns the iPage representation of a particular page, or null if not found 
   */
  getPageFromRoute(
    route: string | null,
    type?: PageType
  ): Observable<iPage | null> {
    if (!route) return of(null);

    return this.getPagesFromClosestSource().pipe(
      map((pages: iPage[]) =>
        type
          ? pages.filter((page: iPage) => page.type === type)
          : pages
      ),
      switchMap((pages: iPage[]) => {
        const page = pages.find((page: any) => page.route === route);

        if (!page)
          // if page not found in session storage, try the API one more time
          return this.getAllPagesAPICall().pipe(
            map((pages: any[]) =>
              type ? pages.filter((page: any) => page.type === type) : pages
            ),
            map((pages) => {
              return pages.find((page: any) => page.route === route);
            })
          );
        else return of(page);
      }),
      map((foundPage: iPage | null) => {
        if (foundPage && foundPage.type !== PageType.Static) {
          if (foundPage.tiles)
            foundPage.tiles.sort((a: any, b: any) => a.order - b.order);
          else foundPage.tiles = [];
        }
        return foundPage;
      })
    );
  }

  private getPagesFromClosestSource(): Observable<iPage[]> {
    if (environment.useCache) {
      // todo: check for cache recency
      this._pages = JSON.parse(
        <string>sessionStorage.getItem(this._pageSessionKey)
      );
    }

    if (!this._pages) return this.getAllPagesAPICall();
    else return of(<iPage[]>this._pages);
  }

  private getAllPagesAPICall(): Observable<iPage[]> {
    return this.http.get(environment.apiBaseUrl + 'pages').pipe(
      map((response: any) => {
        this._pages = this.parsePagesFromString(response.body);
        sessionStorage.setItem(
          this._pageSessionKey,
          JSON.stringify(this._pages)
        );
        return this._pages;
      })
    );
  }

  private parsePagesFromString(responseBody: string): iPage[] {
    const retList: iPage[] = [];

    JSON.parse(responseBody).Items.forEach((page: any) => {
      const retValue: Record<string, any> = {};
      for (const [key, value] of Object.entries(page)) {
        retValue[key] = this.parseTypedObj(value);
      }
      retList.push(<iPage>retValue);
    });

    return retList;
  }

  private parseTypedObj(typedObj: any): any {
    switch (Object.keys(typedObj)[0]) {
      case 'BOOL':
        return typedObj.BOOL;
      case 'S':
        return typedObj.S;
      case 'SS':
        return typedObj.SS;
      case 'N':
        return parseInt(typedObj.N);
      case 'NS':
        return typedObj.NS.map((v: any) => parseInt(v));
      case 'L':
        return typedObj.L.map((v: any) => this.parseTypedObj(v));
      case 'M':
        const obj: Record<string, any> = {};
        Object.keys(typedObj.M).forEach(
          (key) => (obj[key] = this.parseTypedObj(typedObj.M[key]))
        );
        return obj;
      default:
        return JSON.parse(typedObj.S);
    }
  }
}
