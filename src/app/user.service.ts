import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_URL} from './constants';
import {UpdateUserDTO, User, UserPublicInfo} from './model/User';
import {AuthenticationService} from './authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  public static getCurrentUsername() {
    const token = localStorage.getItem('access_token');
    return AuthenticationService.getInfoFromToken(token, 'sub');
  }

  public static getCurrentUserId() {
    const token = localStorage.getItem('access_token');
    return AuthenticationService.getInfoFromToken(token, 'id');
  }

  private static authorizationHeader(): string {
    const token = localStorage.getItem('access_token');
    return `Bearer ${token}`;
  }

  private static getHeaders() {
    return new HttpHeaders({
      Authorization: UserService.authorizationHeader()
    });
  }

  public getUserPublicInfo(username: string): Observable<UserPublicInfo> {
    return this.httpClient.get<UserPublicInfo>(`${API_URL}/public/users?username=${username}`);
  }

  public getUser(username: string): Observable<User> {
    return this.httpClient.get<User>(`${API_URL}/users?username=${username}`, {
      headers: UserService.getHeaders()
    });
  }

  public getUnreadMessagesCount(username: string): Observable<number> {
    return this.httpClient.get<number>(`${API_URL}/messages/count?username=${username}&read=0`, {
      headers: UserService.getHeaders()
    });
  }

  public getPendingTasksCount(username: string): Observable<number> {
    return this.httpClient.get<number>(`${API_URL}/tasks/count?username=${username}&pending=1`, {
      headers: UserService.getHeaders()
    });
  }

  public updateUser(id: string, user: UpdateUserDTO) {
    return this.httpClient.put<User>(`${API_URL}/users/${id}`, user, {
      headers: UserService.getHeaders()
    });
  }
}
