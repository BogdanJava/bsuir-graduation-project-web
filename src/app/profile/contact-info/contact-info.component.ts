import { Component, OnInit } from '@angular/core';
import {UpdateUserDTO, User} from '../../model/User';
import {UserService} from '../../user.service';
import {NotificationsService} from '../../notifications.service';
import {ReflectionUtils} from '../../model/ReflectionUtils';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent implements OnInit {
  public user: User;
  private source: User;

  constructor(private userService: UserService,
              private notifications: NotificationsService) {
  }

  ngOnInit() {
    const username = UserService.getCurrentUsername();
    this.userService.getUser(username).subscribe(user => {
      user.birthday = new Date(user.birthday);
      this.source = ReflectionUtils.copyObject(user);
      this.user = ReflectionUtils.copyObject(user);
    });
  }

  public discardChanges(): void {
    this.user = ReflectionUtils.copyObject(this.source);
  }

  public updateUser(): void {
    if (this.user.birthday) {
      this.user.birthday = (this.user.birthday as Date).getTime();
    } else {
      this.user.birthday = null;
    }
    this.userService.updateUser(UserService.getCurrentUserId(),
      UpdateUserDTO.fromUser(this.user)).subscribe(
      user => {
        user.birthday = new Date(user.birthday);
        this.source = ReflectionUtils.copyObject(user);
        this.user = ReflectionUtils.copyObject(user);
        this.notifications.pushNotification('User info updated');
      });
  }

}
