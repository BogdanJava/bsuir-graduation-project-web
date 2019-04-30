import {Injectable} from '@angular/core';
import {AbstractHttpService} from './abstract-http.service';
import {TimeRequest} from './model/TimeRequest';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserService} from './user.service';
import {API_URL} from './constants';
import {WorktimeRequest} from './model/WorktimeRequest';

@Injectable({
  providedIn: 'root'
})
export class WorktimeRequestService extends AbstractHttpService<WorktimeRequest> {
  constructor(private http: HttpClient) {
    super(http);
  }

  create(timeRequest: WorktimeRequest): Observable<TimeRequest> {
    return this.http.post<TimeRequest>(`${API_URL}/worktime`, timeRequest, {
      headers: AbstractHttpService.getHeaders()
    });
  }

  getUnapprovedRequestsCount(userId: string): Observable<number> {
    return this.http.get<number>(`${API_URL}/worktime/approver/${userId}/count`, {
      headers: UserService.getHeaders()
    });
  }

  approveRequest(requestId: string): Observable<WorktimeRequest> {
    return this.http.put<TimeRequest>(`${API_URL}/worktime/${requestId}`, {}, {
      headers: UserService.getHeaders()
    });
  }

  protected getFilterEndpoint(): string {
    return `${API_URL}/worktime/filter`;
  }
}
