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

  getSubjectWrapper(...params: Pair[]): WebSocketSubjectWrapper {
    if (!params) {
      params = [];
    }
    params.push(
      {key: 'userId', value: UserService.getCurrentUserId()},
      {key: 'accessToken', value: AuthenticationService.getToken()});
    const webSocketSubject = webSocket(AbstractWebsocketService.addParams(this.getMapping(), params));
    return new WebSocketSubjectWrapper(webSocketSubject);
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

export class WebSocketSubjectWrapper {
  private connected: boolean = false;
  private reconnectTriesCount = 0;

  constructor(private subject: WebSocketSubject<{}>,
              private reconnectInterval: number = 5000,
              private reconnectMaxTries: number = 10) {
  }


  subscribe(onResult: (msg) => void, onError?: (error) => void) {
    if (!onError) {
      onError = error => {
        console.log('my error: ', error);
      };
    }
    return this.subject.subscribe((msg) => {
      this.connected = true;
      onResult(msg);
    }, onError, () => {
      this.connected = false;
      setInterval(() => {
        this.doSubscribe(onResult, onError);
      }, this.reconnectInterval);
    });
  }

  unsubscribe() {
    this.subject.unsubscribe();
  }

  private doSubscribe(onResult: (msg) => void, onError: (error) => void) {
    this.subject.subscribe(onResult, onError, () => {
      if (this.reconnectTriesCount < this.reconnectMaxTries) {
        console.log(`Reconnecting... Tries remain: ${this.reconnectMaxTries - ++this.reconnectTriesCount}`);
      } else {
        console.log('Unable to connect');
      }
    });
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

