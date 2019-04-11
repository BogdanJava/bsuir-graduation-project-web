import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {NotificationsService} from '../notifications.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
              private notifications: NotificationsService) {
  }

  public guestTabs = [
    new TabItem('Login', 'input', 'login'),
    new TabItem('Help', 'help', 'help')
  ];

  public authenticatedUserTabs = [
    new TabItem('Logout', 'exit_to_app', 'login', () => {
      this.authenticationService.logout();
      this.notifications.pushNotification('Logged out');
    }),
    new TabItem('Help', 'help', 'help')
  ];

  @Output()
  private clickLinkEventEmitter = new EventEmitter();
  public tabList: TabItem[];

  ngOnInit() {
    this.tabList = AuthenticationService.isTokenExpired() ? this.guestTabs : this.authenticatedUserTabs;
  }

  closeSidenav(action?: () => void) {
    this.clickLinkEventEmitter.emit();
    if (action) {
      action();
    }
  }
}

class TabItem {
  constructor(public text: string,
              public icon: string,
              public path: string,
              public action?: () => void) {
    if (!action) {
      this.action = () => {
      };
    }
  }
}
