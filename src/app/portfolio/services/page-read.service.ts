import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  filter,
  map,
  Observable,
  of,
  tap,
} from 'rxjs';
import {
  isPagesListCacheExpired,
  PAGES_LIST_LS_KEY,
  PAGES_LIST_UPDATED_LS_KEY,
  setPagesListCache,
} from 'src/app/shared/functions/cache-functions';
import { iPage, iTile } from 'src/app/shared/interfaces.const';
import { environment } from 'src/environments/environment';
import { PageType } from '../../shared/enums.const';

interface PageState {
  pages: iPage[];
  page?: iPage;
}

@Injectable({
  providedIn: 'root',
})
export class PageReadService {
  private _pagesSubject: BehaviorSubject<iPage[] | null> = new BehaviorSubject<
    iPage[] | null
  >(null);
  private _pagesInitStarted = false;
  private _pagesApiLoading = false;

  public get pages$(): Observable<iPage[] | null> {
    const cacheIsExpired = isPagesListCacheExpired();

    if (cacheIsExpired) {
      this.removePagesCache();
    }

    if (!this._pagesSubject.value && environment.useCache && !cacheIsExpired) {
      const cachePages = this.getPagesFromCache();
      if (cachePages != null) this._pagesSubject.next(cachePages);
    }

    if (!this._pagesSubject.value || cacheIsExpired) {
      this._pagesSubject.next(null);
      this.getAllPagesAndUpdateCache().subscribe((pages) =>
        this._pagesSubject.next(pages)
      );
    }

    return this._pagesSubject.asObservable();
  }

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
  ): Observable<iPage | undefined> {
    return this.pages$.pipe(
      filter((pages) => pages != null),
      map((pages) => this.findPage(pages ?? [], type, route))
    );
  }

  private sortPageTiles(page?: iPage): iPage | undefined {
    if (page && page.type !== PageType.Static) {
      if (page.tiles) page.tiles.sort((a: iTile, b: iTile) => a.order - b.order);
      else page.tiles = [];
    }
    return page;
  }

  private filterPagesByType(
    pages: iPage[] | null | undefined,
    type: PageType | undefined
  ): iPage[] {
    return (
      (type ? pages?.filter((page: iPage) => page.type === type) : pages) ?? []
    );
  }

  private findPage(
    pages: iPage[],
    type: PageType | undefined,
    route: string | null
  ): iPage | undefined {
    return this.sortPageTiles(
      this.filterPagesByType(pages, type).find(
        (page: iPage) => page.route === route && !page.hidden
      )
    );
  }

  private setPagesInCache(pages: iPage[]) {
    setPagesListCache(JSON.stringify(pages));
  }

  private removePagesCache() {
    localStorage.removeItem(PAGES_LIST_LS_KEY);
    localStorage.removeItem(PAGES_LIST_UPDATED_LS_KEY);
  }

  private getPagesFromCache(): iPage[] | null {
    try {
      const pagesString = <string>localStorage.getItem(PAGES_LIST_LS_KEY);
      if (pagesString) {
        const pages = JSON.parse(pagesString);
        return pages;
      }
    } catch {}

    return null;
  }

  private getAllPagesAndUpdateCache(): Observable<iPage[]> {
    this._pagesSubject.next(null);
    localStorage.removeItem(PAGES_LIST_UPDATED_LS_KEY);

    return this.getAllPagesAPICall().pipe(
      tap((pages: iPage[]) => {
        //console.log('api pages: ' + pages.length);
        this._pagesSubject.next(pages);
        this.setPagesInCache(pages);
      }),
      catchError(() => {
        this._pagesSubject.next(null);
        return of([]);
      })
    );
  }

  private getAllPagesAPICall(): Observable<iPage[]> {
    this._pagesApiLoading = true;
    return this.httpClient.get(environment.apiBaseUrl + 'pages').pipe(
      map((response: any) => {
        const pages = this.parsePagesFromString(response.body);
        return pages;
      }),
      tap(() => (this._pagesApiLoading = false)),
      catchError((err, errObs) => {
        console.error(err);
        return errObs;
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
