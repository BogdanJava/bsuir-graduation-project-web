import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {User} from '../model/User';
import {UserService} from '../user.service';
import {AuthenticationService} from '../authentication/authentication.service';
import {TabItem} from '../model/TabItem';
import {NotificationsService} from '../notifications.service';
import {TimeRequestService} from '../time-request.service';
import {WorktimeRequestService} from '../worktime.service';
import {merge} from 'rxjs';
import {TaskStatus} from '../model/TaskStatus';
import {NotificationsWebsocketService} from '../abstract-websocket.service';
import {ReflectionUtils} from '../model/ReflectionUtils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private webSocketSubject = this.notificationsWebSocketService.getSubject();
  public user: User;
  public unreadMessagesCount: number = null;
  public pendingTasksCount: number = null;
  public timeRequestsCount: number = null;
  public tabs: TabItem[] = [
    {
      text: 'Profile', path: 'profile', icon: 'account_circle', action: () => {
      }
    },
    new TabItem('Admin console', 'supervisor_account', 'admin-console'),
    {
      text: 'Logout', path: '', icon: 'exit_to_app', action: () => {
        this.authService.logout(() => {
          this.notifications.pushNotification('Logged out');
        });
      }
    },
  ];
  @Output()
  private clickMenuButtonEventEmitter = new EventEmitter();

  constructor(private userService: UserService,
              private timeRequestService: TimeRequestService,
              private worktimeRequestService: WorktimeRequestService,
              private authService: AuthenticationService,
              private notifications: NotificationsService,
              private notificationsWebSocketService: NotificationsWebsocketService) {
  }

  ngOnDestroy(): void {
    this.webSocketSubject.unsubscribe();
  }

  ngOnInit() {
    this.webSocketSubject.subscribe(event => {
      console.log(event);
      const source = event['source'];
      if (source['className'] === 'WorktimeRequest' || source['className'] === 'TimeRequest') {
        this.timeRequestsCount = null;
        this.loadTimeRequestsCount();
      }
      if (source['className'] === 'UserDocument') {
        if (source['type'] === 'UPDATE') {
          this.user = ReflectionUtils.getInstanceFromRawObject(source['obj'], User);
        }
      }
    });
    this.fetchUser();
    this.authService.userState.subscribe(user => {
      if (user) {
        this.fetchUser();
      } else {
        this.unsetAll();
      }
    });
  }

  toggleSidenav() {
    this.clickMenuButtonEventEmitter.emit();
  }

  private fetchUser(): void {
    const username = UserService.getCurrentUsername();
    if (username) {
      this.userService.getUser(username).subscribe(userDocument => {
        this.user = userDocument;
      });
      this.userService.getUnreadMessagesCount(username).subscribe(count => {
        this.unreadMessagesCount = count;
      });
      this.userService.getPendingTasksCount(UserService.getCurrentUserId(), TaskStatus.Open).subscribe(count => {
        this.pendingTasksCount = count;
      });
      this.loadTimeRequestsCount();
    } else {
      this.unsetAll();
    }
  }

  private unsetAll() {
    this.user = null;
    this.unreadMessagesCount = null;
    this.pendingTasksCount = null;
    this.timeRequestsCount = null;
  }

  private loadTimeRequestsCount() {
    const timeRequestsCountObservable = this.timeRequestService.getUnapprovedRequestsCount(UserService.getCurrentUserId());
    const worktimeRequestsCountObservable = this.worktimeRequestService.getUnapprovedRequestsCount(UserService.getCurrentUserId());
    merge(timeRequestsCountObservable, worktimeRequestsCountObservable).subscribe(result => {
      if (this.timeRequestsCount == null) {
        this.timeRequestsCount = result;
      } else {
        this.timeRequestsCount += result;
      }
    });
  }
}
