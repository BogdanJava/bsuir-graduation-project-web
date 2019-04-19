import {HttpClient, HttpHeaders} from '@angular/common/http';

export abstract class AbstractHttpService<T> {
  protected constructor(protected httpClient: HttpClient) {
  }

  protected abstract getFilterEndpoint(): string;

  private static authorizationHeader(): string {
    const token = localStorage.getItem('access_token');
    return `Bearer ${token}`;
  }

  public static getHeaders() {
    return new HttpHeaders({
      Authorization: AbstractHttpService.authorizationHeader()
    });
  }

  public getByFilter(filter: object, projection: string[]) {
    filter = {filter: filter};
    return this.httpClient.get<T[]>(`${this.getFilterEndpoint()}?filter=${encodeURIComponent(JSON.stringify(filter))}
    &projection=${encodeURIComponent(JSON.stringify(projection))}`, {
      headers: AbstractHttpService.getHeaders()
    });
  }
}
