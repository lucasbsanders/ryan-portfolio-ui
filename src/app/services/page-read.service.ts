import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AwsConnectService } from './aws-connect.service';
import { allPages } from './pages.const';

@Injectable({
  providedIn: 'root',
})
export class PageReadService {
  private _pages: any[] = [];
  private _pageSessionKey = 'RYAN-PORTFOLIO-PAGES';

  constructor(
    private awsService: AwsConnectService,
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

  instantiatePages(): Observable<any[]> {
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

  parsePagesFromString(responseBody: any): any[] {
    const retList: any[] = [];
    
    JSON.parse(responseBody).Items.forEach((page: any) => {
      const retValue: Record<string, any> = {};
      for (const [key, value] of Object.entries(page)) {
        retValue[key] = this.awsService.parseTypedObj(value);
      }
      retList.push(retValue);
    });
  
    return retList;
  }

  getAllPages(): Observable<any> {
    return this.http.get(
      'https://0c5wla1jif.execute-api.us-west-2.amazonaws.com/dev/pages'
    );
  }
}
