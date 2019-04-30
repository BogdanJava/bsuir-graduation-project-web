import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Project} from './model/Project';
import {AbstractHttpService} from './abstract-http.service';
import {API_URL} from './constants';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends AbstractHttpService<Project> {

  constructor(private http: HttpClient) {
    super(http);
  }

  getByUserId(userId: string): Observable<Project[]> {
    return this.http.get<Project[]>(`${API_URL}/projects/${userId}`, {
      headers: UserService.getHeaders()
    });
  }

  protected getFilterEndpoint(): string {
    return `${API_URL}/projects/filter`;
  }
}
