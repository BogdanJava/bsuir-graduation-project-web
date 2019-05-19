import {Injectable} from '@angular/core';
import {WEB_SOCKET_URL} from './constants';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {UserService} from './user.service';
import {AuthenticationService} from './authentication/authentication.service';

abstract class AbstractWebsocketService {
  urlQuery: string;

  static addParams(mapping: string, params: Pair[]): string {
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

  getSubjectWrapper(): WebSocketSubjectWrapper {
    this.urlQuery = AbstractWebsocketService.addParams(this.getMapping(), getConnectParams());
    const webSocketSubject = webSocket(this.urlQuery);
    return new WebSocketSubjectWrapper(webSocketSubject, this.getMapping());
  }

  protected abstract endpointMapping(): string;

  private getMapping(): string {
    return `${WEB_SOCKET_URL}${this.endpointMapping()}`;
  }

}

export class WebSocketSubjectWrapper {
  private connected: boolean = false;
  private reconnectTriesCount = 0;

  constructor(private subject: WebSocketSubject<{}>,
              private mapping: string,
              private reconnectInterval: number = 5000,
              private reconnectMaxTries: number = 1000) {
  }


  subscribe(onResult: (msg) => void, onError?: (error) => void) {
    if (!onError) {
      onError = error => {
        console.log(error);
        this.connected = false;
        setTimeout(() => {
          this.doSubscribe(onResult, onError);
        }, this.reconnectInterval);
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
    const queryString = AbstractWebsocketService.addParams(this.mapping, getConnectParams());
    this.subject = webSocket(queryString);
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

function getConnectParams() {
  return [
    {key: 'userId', value: UserService.getCurrentUserId()},
    {key: 'accessToken', value: AuthenticationService.getToken()}];
}
