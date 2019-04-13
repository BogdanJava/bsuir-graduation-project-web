import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../model/User';
import {UserService} from '../user.service';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output()
  private clickMenuButtonEventEmitter = new EventEmitter();
  private user: User;
  private unreadMessagesCount: number = null;
  private pendingTasksCount: number = null;

  constructor(private userService: UserService,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    const username = this.authService.getUsernameFromToken(localStorage.getItem('access_token'));
    if (username) {
      this.userService.getUser(username).subscribe(user => {
        this.user = user;
      });
      this.userService.getUnreadMessagesCount(username).subscribe(count => {
        this.unreadMessagesCount = count;
      });
      this.userService.getPendingTasksCount(username).subscribe(count => {
        this.pendingTasksCount = count;
      });
    }
  }

  toggleSidenav() {
    this.clickMenuButtonEventEmitter.emit();
  }
}
