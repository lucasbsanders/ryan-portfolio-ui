import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, pipe, switchMap } from 'rxjs';
import {
  isCacheExpired,
  PAGE_EXPIRE_KEY,
  PAGE_SESSION_KEY,
  updateCacheExpiration,
} from 'src/app/shared/functions/cache-functions';
import { iPage } from 'src/app/shared/interfaces.const';
import { environment } from 'src/environments/environment';
import { PageType } from '../../shared/enums.const';

@Injectable({
  providedIn: 'root',
})
export class PageReadService {
  private _pages: iPage[] = [];

  constructor(private httpClient: HttpClient) {}

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

    if (isCacheExpired()) {
      return this.getAllPagesAPICall().pipe(
        this.filterPagesByType(type),
        this.findPageByRoute(route),
        this.sortPageTiles()
      );
    } else {
      return of(this._pages).pipe(
        this.filterPagesByType(type),
        this.findPageByRoute(route),
        switchMap((page: iPage | undefined) => {
          if (!page) {
            if (environment.useCache)
              return this.getPagesFromCache().pipe(
                this.filterPagesByType(type),
                this.findPageByRoute(route),
                switchMap((page: iPage | undefined) => {
                  if (!page)
                    return this.getAllPagesAPICall().pipe(
                      this.filterPagesByType(type),
                      this.findPageByRoute(route)
                    );
                  else return of(page);
                })
              );
            else
              return this.getAllPagesAPICall().pipe(
                this.filterPagesByType(type),
                this.findPageByRoute(route)
              );
          } else return of(page);
        }),
        this.sortPageTiles()
      );
    }
  }

  private filterPagesByType(type: PageType | undefined) {
    return pipe(
      map((pages: any) =>
        type ? pages.filter((page: any) => page.type === type) : pages
      )
    );
  }

  private findPageByRoute(route: string | null) {
    return pipe(
      map((pages: any) => pages.find((page: any) => page.route === route))
    );
  }

  private sortPageTiles() {
    return pipe(
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

  private getPagesFromCache(): Observable<iPage[]> {
    this._pages = JSON.parse(<string>sessionStorage.getItem(PAGE_SESSION_KEY));
    return of(this._pages);
  }

  private getAllPagesAPICall(): Observable<iPage[]> {
    sessionStorage.removeItem(PAGE_SESSION_KEY);
    sessionStorage.removeItem(PAGE_EXPIRE_KEY);

    return this.httpClient.get(environment.apiBaseUrl + 'pages').pipe(
      map((response: any) => {
        this._pages = this.parsePagesFromString(response.body);

        if (this._pages.length) {
          sessionStorage.setItem(PAGE_SESSION_KEY, JSON.stringify(this._pages));
          updateCacheExpiration();
        }

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
