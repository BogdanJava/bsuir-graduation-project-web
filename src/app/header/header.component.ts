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
import {NotificationType} from 'angular2-notifications';
import {WorktimeRequest} from '../model/WorktimeRequest';
import {TimeRequest} from '../model/TimeRequest';
import {DatePipe,} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private webSocketSubjectWrapper = this.notificationsWebSocketService.getSubjectWrapper();
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
          this.notifications.alert('Logged out');
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
              private notificationsWebSocketService: NotificationsWebsocketService,
              private datePipe: DatePipe) {
  }

  ngOnDestroy(): void {
    this.webSocketSubjectWrapper.unsubscribe();
  }

  ngOnInit() {
    this.webSocketSubjectWrapper.subscribe(event => {
      const source = event['source'];
      switch (source['className']) {
        case 'UserDocument':
          if (source['type'] === 'UPDATE') {
            this.user = ReflectionUtils.getInstanceFromRawObject(source['obj'], User);
          }
          break;
        case 'TimeRequest':
        case 'WorktimeRequest':
          const type = source['type'];
          if (type === 'APPROVE' || type === 'DECLINE') {
            const action = type === 'APPROVE' ? 'approved' : 'declined';
            this.userService.getUserById(source['obj']['approverId']).subscribe(user => {
              this.notifications.notification('Request approved',
                `${user.realName ? user.realName : user.username} has ${action} your request: 
                ${this.stringifyRequest(source['obj'], source['className'])}`,
                type === 'APPROVE' ? NotificationType.Info : NotificationType.Warn);
            });
          }
          this.timeRequestsCount = null;
          this.loadTimeRequestsCount();
          break;
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

  private stringifyRequest(rawRequest: WorktimeRequest | TimeRequest, type: string) {
    debugger;
    if (type === 'WorktimeRequest') {
      return `Worktime from ${this.datePipe.transform(rawRequest.startDate)} to ${this.datePipe.transform(rawRequest.endDate)}, 
      ${rawRequest['hours']} hours per day`;
    } else if (type === 'TimeRequest') {
      return `${rawRequest['type']} from ${this.datePipe.transform(rawRequest.startDate)} to ${this.datePipe.transform(rawRequest.endDate)}`;
    } else {
      return '';
    }
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
