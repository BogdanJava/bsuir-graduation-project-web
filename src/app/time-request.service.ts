import {Injectable} from '@angular/core';
import {AbstractHttpService} from './abstract-http.service';
import {HttpClient} from '@angular/common/http';
import {TimeRequest} from './model/TimeRequest';
import {API_URL} from './constants';
import {Observable} from 'rxjs';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TimeRequestService extends AbstractHttpService<TimeRequest> {
  constructor(private http: HttpClient) {
    super(http);
  }

  create(timeRequest: TimeRequest): Observable<TimeRequest> {
    return this.http.post<TimeRequest>(`${API_URL}/time-request`, timeRequest, {
      headers: AbstractHttpService.getHeaders()
    });
  }

  getUnapprovedRequestsCount(userId: string): Observable<number> {
    return this.http.get<number>(`${API_URL}/time-request/approver/${userId}/count`, {
      headers: UserService.getHeaders()
    });
  }

  approveRequest(requestId: string): Observable<TimeRequest> {
    return this.http.put<TimeRequest>(`${API_URL}/time-request/${requestId}`, {}, {
      headers: UserService.getHeaders()
    });
  }

  protected getFilterEndpoint(): string {
    return `${API_URL}/time-request/filter`;
  }
}
