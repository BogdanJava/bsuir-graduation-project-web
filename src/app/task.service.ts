import {Injectable} from '@angular/core';
import {AbstractHttpService} from './abstract-http.service';
import {Task} from './model/Task';
import {HttpClient} from '@angular/common/http';
import {API_URL} from './constants';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends AbstractHttpService<Task> {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  protected getFilterEndpoint(): string {
    return `${API_URL}/tasks/filter`;
  }

  public create(task: Task): Observable<Task> {
    return this.httpClient.post(`${API_URL}/tasks`, task, {
      headers: AbstractHttpService.getHeaders()
    });
  }
}
