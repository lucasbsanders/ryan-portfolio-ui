import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { AUTHORIZED_KEY } from 'src/app/shared/functions/cache-functions';
import { hashString } from 'src/app/shared/functions/hash-functions';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Submit the input password and set the local storage AUTHORIZED_KEY based on the response
   * @param password
   * @param applyHashToPassword
   * @returns an observable with the user's authorized status
   */
  public submitPasswordAndSetAuthKey(
    password: string,
    applyHashToPassword: boolean
  ): Observable<boolean> {
    return this._submitPassword(
      applyHashToPassword ? hashString(password) : password
    ).pipe(
      map((response: any) => {
        const isAuth = response.body;
        if (isAuth) localStorage.setItem(AUTHORIZED_KEY, 't');
        else localStorage.removeItem(AUTHORIZED_KEY);

        return isAuth;
      }),
      catchError((err, caught) => {
        localStorage.removeItem(AUTHORIZED_KEY);
        return of(false);
      })
    );
  }

  private _submitPassword(passwordHash: string): Observable<any> {
    return this.httpClient.post(environment.apiBaseUrl + 'authorize', {
      PasswordHash: passwordHash,
    });
  }
}
