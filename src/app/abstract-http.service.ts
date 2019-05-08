import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DataFilter} from './model/DataFilter';

export abstract class AbstractHttpService<T> {
  protected constructor(protected httpClient: HttpClient) {
  }

  public static getHeaders() {
    return new HttpHeaders({
      Authorization: AbstractHttpService.authorizationHeader()
    });
  }

  private static authorizationHeader(): string {
    const token = localStorage.getItem('access_token');
    return `Bearer ${token}`;
  }

  public getByFilter(filter: object, projection?: string[]) {
    let filterEncoded = encodeURIComponent(JSON.stringify({filter: filter}));
    let projectionEncoded = projection ? encodeURIComponent(JSON.stringify(projection)) : null;
    return this.httpClient.get<T[]>(`${this.getFilterEndpoint()}?filter=${filterEncoded}
    ${projectionEncoded ? `&projection=${projectionEncoded}` : ''}`, {
      headers: AbstractHttpService.getHeaders()
    });
  }

  protected abstract getFilterEndpoint(): string;
}
