import {Injectable} from '@angular/core';
import {AccessToken} from './model/AccessToken';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {API_URL} from './constants';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  public static setAccessToken(token: AccessToken): void {
    localStorage.setItem('access_token', token.accessToken);
    localStorage.setItem('expires_at', token.expiresAt.toString());
  }

  public static isTokenExpired(): boolean {
    const expiresAt = localStorage.getItem('expires_at');
    if (expiresAt) {
      const expirationTime = Number.parseInt(expiresAt, 0);
      const now = Date.now() / 1000;
      return expirationTime < now;
    } else {
      return true;
    }
  }

  public getAccessToken(username: string, password: string): Observable<AccessToken> {
    return this.httpClient.post<AccessToken>(`${API_URL}/auth/token`, {username, password});
  }

  public logout(onLogout?, onError?): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    this.router.navigateByUrl('/login').then(result => {
      if (result) {
        if (onLogout) {
          onLogout();
        }
      } else {
        if (onError) {
          onError();
        }
      }
    }, error => {
      if (onError) {
        onError();
      }
    });
  }
}
