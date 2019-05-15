import {Injectable} from '@angular/core';
import {WEB_SOCKET_URL} from './constants';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {UserService} from './user.service';
import {AuthenticationService} from './authentication/authentication.service';

abstract class AbstractWebsocketService {

  private getMapping(): string {
    return `${WEB_SOCKET_URL}${this.endpointMapping()}`;
  }

  protected abstract endpointMapping(): string;

  getSubject(...params: Pair[]): WebSocketSubject<{}> {
    if (!params) {
      params = [];
    }
    params.push(
      {key: 'userId', value: UserService.getCurrentUserId()},
      {key: 'accessToken', value: AuthenticationService.getToken()});
    return webSocket(AbstractWebsocketService.addParams(this.getMapping(), params));
  }

  private static addParams(mapping: string, params: Pair[]): string {
    let builder = ''.concat(mapping);
    for (let i = 0; i < params.length; i++) {
      if (i == 0) {
        builder += `?${params[i].key}=${params[i].value}`;
      } else {
        builder += `&${params[i].key}=${params[i].value}`;
      }
    }
    return builder;
  }

}

@Injectable({
  providedIn: 'root'
})
export class NotificationsWebsocketService extends AbstractWebsocketService {
  protected endpointMapping(): string {
    return '/notifications';
  }
}

class Pair {
  key: string;
  value: string;
}

