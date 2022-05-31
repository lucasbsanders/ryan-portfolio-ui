import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageType } from '../../shared/enums.const';

@Injectable({
  providedIn: 'root',
})
export class PageReadService {

  private _pages: any[] = [];
  private _pageSessionKey: string = 'RYAN-PORTFOLIO-PAGES';

  constructor(private http: HttpClient) {
    this.getPagesFromClosestSource().subscribe();
  }

  getPageByRoute(route: string | null, type?: PageType): Observable<any> {
    if (!route) return of(null);
    else
      return this.getPagesFromClosestSource().pipe(
        switchMap((pages: any[]) => {
          var page;
          if (type)
            page = pages.find(
              (page: any) =>
                page.route === route && page.type.localeCompare(type) === 0
            );
          else page = pages.find((page: any) => page.route === route);

          if (!page)
            return this.fillPagesFromAPI().pipe(
              map((pages) => {
                if (type)
                  return pages.find(
                    (page: any) =>
                      page.route === route &&
                      page.type.localeCompare(type) === 0
                  );
                else return pages.find((page: any) => page.route === route);
              })
            );
          else return of(page);
        })
      );
  }

  getPagesByType(type: PageType): Observable<any[]> {
    if (!type) return of([]);
    else
      return this.getPagesFromClosestSource().pipe(
        switchMap((pages: any[]) =>
          pages.filter((page: any) => page.type === type)
        )
      );
  }

  private getPagesFromClosestSource(): Observable<any[]> {
    if (environment.useCache) {
      this._pages = JSON.parse(
        <string>sessionStorage.getItem(this._pageSessionKey)
      );
    }

    if (!this._pages) return this.fillPagesFromAPI();
    else return of(this._pages);
  }

  private fillPagesFromAPI(): Observable<any> {
    return this.getAllPagesAPICall().pipe(
      map((response) => {
        this._pages = this.parsePagesFromString(response.body);
        sessionStorage.setItem(
          this._pageSessionKey,
          JSON.stringify(this._pages)
        );
        return this._pages;
      })
    );
  }

  private getAllPagesAPICall(): Observable<any> {
    return this.http.get(environment.apiBaseUrl + 'pages');
  }

  private parsePagesFromString(responseBody: any): any[] {
    const retList: any[] = [];

    JSON.parse(responseBody).Items.forEach((page: any) => {
      const retValue: Record<string, any> = {};
      for (const [key, value] of Object.entries(page)) {
        retValue[key] = this.parseTypedObj(value);
      }
      retList.push(retValue);
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
