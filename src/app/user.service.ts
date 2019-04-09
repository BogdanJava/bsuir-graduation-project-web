import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {API_URL} from './constants';
import {UserPublicInfo} from './model/UserPublicInfo';
import {AccessToken} from './model/AccessToken';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  public getUserPublicInfo(username: string): Observable<UserPublicInfo> {
    return this.httpClient.get<UserPublicInfo>(`${API_URL}/public/users?username=${username}`);
  }

  public getAccessToken(username: string, password: string): Observable<AccessToken> {
    return this.httpClient.post<AccessToken>(`${API_URL}/auth/token`, {username, password});
  }

  public setAccessToken(token: AccessToken) {

  }
}
