import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PageReadService {

  private _pages: any[] = [];
  private _pageSessionKey = 'RYAN-PORTFOLIO-PAGES';

  constructor(
    private http: HttpClient
  ) {
    this.instantiatePages().subscribe();
  }

  getPageByRoute(route: string | null): Observable<any> {
    if (!route) return of();
    else if (!this._pages) {
      return this.instantiatePages().pipe(
        map((pages) =>
          pages.find((page: { route: string }) => page.route === route)
        )
      );
    } else return of(this._pages.find((page) => page.route === route));
  }

  private instantiatePages(): Observable<any[]> {
    this._pages = JSON.parse(
      <string>sessionStorage.getItem(this._pageSessionKey)
    );

    if (!this._pages) {
      return this.getAllPages().pipe(
        map((response) => {
          this._pages = this.parsePagesFromString(response.body);
          sessionStorage.setItem(this._pageSessionKey, JSON.stringify(this._pages));
          return this._pages;
        })
      );
    } else return of(this._pages);
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

  private getAllPages(): Observable<any> {
    return this.http.get(
      environment.apiBaseUrl + 'pages'
    );
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
        Object.keys(typedObj.M).forEach(key => obj[key] = this.parseTypedObj(typedObj.M[key]))
        return obj;
      default:
        return JSON.parse(typedObj.S);
    }
  }

}
