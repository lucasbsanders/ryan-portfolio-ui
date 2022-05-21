import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PageReadService {
  private _pages: any[] = [];
  private _pageSessionKey = 'RYAN-PORTFOLIO-PAGES';

  constructor(private http: HttpClient) {
    this.getPagesFromClosestSource().subscribe();
  }

  getPageByRoute(route: string | null): Observable<any> {
    if (!route) return of();
    else
      return this.getPagesFromClosestSource().pipe(
        switchMap((pages: any[]) => {
          const page = pages.find((page: any) => page.route === route);
          if (!page)
            return this.fillPagesFromAPI().pipe(
              map((pages) => pages.find((page: any) => page.route === route))
            );
          else return of(page);
        })
      );
  }

  private getPagesFromClosestSource(): Observable<any[]> {
    this._pages = JSON.parse(
      <string>sessionStorage.getItem(this._pageSessionKey)
    );

    var pagesObs: Observable<any>;

    if (!this._pages) pagesObs = this.fillPagesFromAPI();
    else pagesObs = of(this._pages);

    return pagesObs;
  }

  private fillPagesFromAPI(): Observable<any> {
    return this.getAllPagesAPICall().pipe(
      map((response) => {
        this._pages = this.parsePagesFromString(response.body);
        sessionStorage.setItem(
          this._pageSessionKey,
          JSON.stringify(this._pages)
        );
        console.log('New API call');
        console.log(this._pages);
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
