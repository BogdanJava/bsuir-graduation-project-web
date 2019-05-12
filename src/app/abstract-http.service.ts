import {HttpClient, HttpHeaders} from '@angular/common/http';

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

  public getByFilter(filter: object,
                     projection?: string[],
                     pageNumber: number = 0,
                     pageSize: number = 100) {
    let filterEncoded = encodeURIComponent(JSON.stringify({filter: filter}));
    let projectionEncoded = projection ? encodeURIComponent(JSON.stringify(projection)) : null;
    let pagination = encodeURI(`pageSize=${pageSize}&pageNumber=${pageNumber}`);
    return this.httpClient.get<T[]>(`${this.getFilterEndpoint()}?filter=${filterEncoded}
    ${projectionEncoded ? `&projection=${projectionEncoded}` : ''}
    &${pagination}`, {
      headers: AbstractHttpService.getHeaders()
    });
  }

  protected abstract getFilterEndpoint(): string;
}
