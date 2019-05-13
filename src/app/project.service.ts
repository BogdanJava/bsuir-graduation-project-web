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
      headers: AbstractHttpService.getHeaders()
    });
  }

  protected getFilterEndpoint(): string {
    return `${API_URL}/projects/filter`;
  }

  existsByName(projectName: string): Observable<boolean> {
    return this.http.get<boolean>(`${API_URL}/projects/exists?projectName=${projectName}`, {
      headers: AbstractHttpService.getHeaders()
    });
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${API_URL}/projects`, project, {
      headers: AbstractHttpService.getHeaders()
    });
  }

  getProjectsCount(): Observable<number> {
    return this.http.get<number>(`${API_URL}/projects/count`, {
      headers: AbstractHttpService.getHeaders()
    })
  }
}
