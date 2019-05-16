import {Component, OnInit} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {NotificationsService} from '../../../notifications.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  public hidePasswordNew: boolean = true;
  public hidePasswordOld: boolean = true;
  public hidePasswordRepeat: boolean = true;
  public isLinear = true;
  public errorMessage: string;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private authService: AuthenticationService,
              private notifications: NotificationsService) {
    this.firstFormGroup = this._formBuilder.group({
      oldPassword: ['', Validators.required, this.isOldPasswordCorrect()]
    });
    this.secondFormGroup = this._formBuilder.group({
      newPassword: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      repeatNewPassword: ['', Validators.required, this.matchesNewPassword()]
    });
  }

  ngOnInit() {
  }

  public updatePassword(stepper): void {
    let oldPassword = this.firstFormGroup.controls['oldPassword'].value;
    let newPassword = this.secondFormGroup.controls['newPassword'].value;
    this.authService.updatePassword(oldPassword, newPassword).subscribe(result => {
      if (result) {
        this.notifications.alert('Password has been updated');
        stepper.reset();
      }
    });
  }

  private isOldPasswordCorrect(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return this.authService.checkPassword(control.value).toPromise().then(result => {
        this.errorMessage = result ? '' : 'Incorrect password';
        return result ? null : {'incorrectPassword': {value: true}};
      }, errors => {
        console.log(errors);
        this.errorMessage = 'Incorrect password';
        return {'incorrectPassword': {value: true}};
      });
    };
  }

  private matchesNewPassword(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return new Promise((resolve) => {
        let newPassword = this.secondFormGroup.controls['newPassword'].value;
        resolve(control.value === newPassword ? null : {'passwordsDoNotMatch': {value: true}});
      });
    };
  }
}
