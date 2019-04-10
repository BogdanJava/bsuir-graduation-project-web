import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user.service';
import {UserPublicInfo} from '../../model/UserPublicInfo';
import {FormControl, Validators} from '@angular/forms';
import {error} from '@angular/compiler/src/util';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  public hidePassword = true;

  public usernameFormControl = new FormControl('', [Validators.required]);
  public passwordFormControl = new FormControl('', [Validators.required]);
  public username: string;
  public password: string;
  public userInfo: UserPublicInfo;
  public errorMessage: string;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  checkUsernameExists(username: string) {
    if (this.basicControlValidation(this.usernameFormControl, 'Username')) {
      this.userService.getUserPublicInfo(username).subscribe(userInfo => {
        this.userInfo = userInfo;
      }, err => {
        if (err.status === 404) {
          this.usernameFormControl.setErrors({
            invalid: true,
          });
          this.errorMessage = err.error.message;
        }
      });
    }
  }

  getAccessToken(username: string, password: string) {
    if (this.basicControlValidation(this.passwordFormControl, 'Password')) {
      this.userService.getAccessToken(username, password).subscribe(token => {
        UserService.setAccessToken(token);
      }, err => {
        if (err.status === 401) {
          this.passwordFormControl.setErrors({
            invalid: true,
          });
          this.errorMessage = err.error.message;
        }
      });
    }
  }

  basicControlValidation(formControl: FormControl, formControlName: string) {
    if (formControl.errors) {
      if (formControl.getError('required')) {
        this.errorMessage = `${formControlName} must not be empty`;
      }
    }
    return formControl.errors == null;
  }

  removeCurrentUserInfo() {
    this.userInfo = null;
    this.username = null;
  }
}
