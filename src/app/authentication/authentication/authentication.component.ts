import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user.service';
import {UserPublicInfo} from '../../model/UserPublicInfo';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  public hidePassword = true;

  public usernameFormControl = new FormControl('', [Validators.required]);
  public username: string;
  public password: string;
  public userInfo: UserPublicInfo;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  checkUsernameExists(username: string) {
    if (!this.usernameFormControl.errors) {
      this.userService.getUserPublicInfo(username).subscribe(userInfo => {
        this.userInfo = userInfo;
      }, console.error);
    }
  }

  getAccessToken(username: string, password: string) {
    this.userService.getAccessToken(username, password).subscribe(token => {
      this.userService.setAccessToken(token);
    });
  }

  removeCurrentUserInfo() {
    this.userInfo = null;
    this.username = null;
  }
}
