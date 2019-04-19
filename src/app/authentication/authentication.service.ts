import {Injectable} from '@angular/core';
import {AccessToken} from '../model/AccessToken';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../constants';
import {Router} from '@angular/router';
import * as jwtDecode from 'jwt-decode';
import {User} from '../model/User';
import {UserService} from '../user.service';
import {AbstractHttpService} from '../abstract-http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private state = new Subject<User>();
  public userState = this.state.asObservable();

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  public static setAccessToken(token: AccessToken): void {
    localStorage.setItem('access_token', token.accessToken);
    localStorage.setItem('expires_at', token.expiresAt.toString());
  }

  public static getInfoFromToken(token: string, tokenField: string): string {
    try {
      return jwtDecode(token)[tokenField];
    } catch (e) {
      return null;
    }
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

  public setUser(user: User) {
    this.state.next(user);
  }

  public getAccessToken(
    username: string,
    password: string
  ): Observable<AccessToken> {
    return this.httpClient.post<AccessToken>(`${API_URL}/auth/token`, {
      username,
      password
    });
  }

  public updatePassword(
    oldPassword: string,
    newPassword: string
  ): Observable<boolean> {
    return this.httpClient.post<boolean>(
      `${API_URL}/auth/update-password`,
      {
        old: oldPassword,
        new: newPassword
      },
      {
        headers: AbstractHttpService.getHeaders()
      }
    );
  }

  public checkPassword(password: string): Observable<boolean> {
    return this.httpClient.post<boolean>(`${API_URL}/auth/check-password`, {password}, {
      headers: AbstractHttpService.getHeaders()
    });
  }

  public logout(onLogout?, onError?): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    this.setUser(null);
    this.router.navigateByUrl('/login').then(
      result => {
        if (result) {
          if (onLogout) {
            onLogout();
          }
        } else {
          if (onError) {
            onError();
          }
        }
      },
      error => {
        if (onError) {
          onError();
        }
      }
    );
  }
}
