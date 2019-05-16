import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {API_URL} from './constants';
import {UpdateUserDTO, User, UserPublicInfo} from './model/User';
import {AuthenticationService} from './authentication/authentication.service';
import {AbstractHttpService} from './abstract-http.service';
import {TaskStatus} from './model/TaskStatus';

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractHttpService<User> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public static getCurrentUsername() {
    const token = localStorage.getItem('access_token');
    return AuthenticationService.getInfoFromToken(token, 'sub');
  }

  public static getCurrentUserId() {
    const token = localStorage.getItem('access_token');
    return AuthenticationService.getInfoFromToken(token, 'id');
  }

  public getUserPublicInfo(username: string): Observable<UserPublicInfo> {
    return this.httpClient.get<UserPublicInfo>(
      `${API_URL}/public/users?username=${username}`
    );
  }

  public getUser(username: string): Observable<User> {
    return this.httpClient.get<User>(`${API_URL}/users?username=${username}`, {
      headers: AbstractHttpService.getHeaders()
    });
  }

  public getUserById(userId: string): Observable<User> {
    return this.httpClient.get<User>(`${API_URL}/users/${userId}`, {
      headers: AbstractHttpService.getHeaders()
    });
  }

  public getUnreadMessagesCount(username: string): Observable<number> {
    return this.httpClient.get<number>(
      `${API_URL}/messages/count?username=${username}&read=0`,
      {
        headers: AbstractHttpService.getHeaders()
      }
    );
  }

  public getPendingTasksCount(assigneeId: string, status: TaskStatus): Observable<number> {
    return this.httpClient.get<number>(
      `${API_URL}/tasks/count/${assigneeId}?status=${status}`,
      {
        headers: AbstractHttpService.getHeaders()
      }
    );
  }

  public updateUser(id: string, user: UpdateUserDTO) {
    return this.httpClient.put<User>(`${API_URL}/users/${id}`, user, {
      headers: AbstractHttpService.getHeaders()
    });
  }

  protected getFilterEndpoint(): string {
    return `${API_URL}/users/filter`;
  }

  getUsersCount(): Observable<number> {
    return this.httpClient.get<number>(`${API_URL}/users/count`, {
      headers: AbstractHttpService.getHeaders()
    });
  }

  checkUsernameExists(username: string) {
    return this.httpClient.get<boolean>(`${API_URL}/users/exists?username=${username}`, {
      headers: AbstractHttpService.getHeaders()
    });
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${API_URL}/users`, user, {
      headers: AbstractHttpService.getHeaders()
    });
  }
}
