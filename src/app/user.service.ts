import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {API_URL} from './constants';
import {User, UserPublicInfo} from './model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  public getUserPublicInfo(username: string): Observable<UserPublicInfo> {
    return this.httpClient.get<UserPublicInfo>(`${API_URL}/public/users?username=${username}`);
  }

  public getUser(username: string): Observable<User> {
    return this.httpClient.get<User>(`${API_URL}/users?username=${username}`);
  }

  public getUnreadMessagesCount(username: string): Observable<number> {
    return this.httpClient.get<number>(`${API_URL}/messages/count?username=${username}&read=0`);
  }

  public getPendingTasksCount(username: string): Observable<number> {
    return this.httpClient.get<number>(`${API_URL}/tasks/count?username=${username}&pending=1`);
  }
}
