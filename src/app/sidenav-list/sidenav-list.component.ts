import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {NotificationsService} from '../notifications.service';
import {TabItem} from '../model/TabItem';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  public guestTabs = [
    new TabItem('Login', 'input', 'login'),
    new TabItem('Help', 'help', 'help')
  ];
  public authenticatedUserTabs = [
    new TabItem('Timeline', 'timeline', 'timeline'),
    new TabItem('Calendar', 'event_note', 'calendar'),
    new TabItem('Help', 'help', 'help'),
    new TabItem('Logout', 'exit_to_app', 'login', () => {
      this.authenticationService.logout();
      this.notifications.pushNotification('Logged out');
    })
  ];
  public tabList: TabItem[];
  @Output()
  private clickLinkEventEmitter = new EventEmitter();

  constructor(private authenticationService: AuthenticationService,
              private notifications: NotificationsService) {
  }

  ngOnInit() {
    this.tabList = AuthenticationService.isTokenExpired() ? this.guestTabs : this.authenticatedUserTabs;
    this.authenticationService.userState.subscribe(user => {
      this.tabList = user ? this.authenticatedUserTabs : this.guestTabs;
    });
  }

  closeSidenav(action?: () => void) {
    this.clickLinkEventEmitter.emit();
    if (action) {
      action();
    }
  }
}
