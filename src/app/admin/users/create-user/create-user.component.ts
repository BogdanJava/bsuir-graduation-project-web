import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Role, User} from '../../../model/User';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material';
import {UserService} from '../../../user.service';
import {NotificationsService} from '../../../notifications.service';
import {AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors,  Validators} from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  user: User = CreateUserComponent.newUser();
  roles: Role[] = [Role.Admin, Role.User, Role.Moderator];
  separatorsList: number[] = [ENTER, COMMA];

  @ViewChild('auto')
  private matAutocomplete: MatAutocomplete;

  @ViewChild('roleInput')
  private roleInput: ElementRef<HTMLInputElement>;

  filteredRoles: Role[];
  createUserForm: FormGroup;
  hidePassword: boolean = true;

  constructor(private userService: UserService,
              private _formBuilder: FormBuilder,
              private notifications: NotificationsService) {
    this.filteredRoles = this.getSelectableRoles(null);
    this.createUserForm = this._formBuilder.group({
      username: ['', Validators.required, this.checkUsernameUniqueness()],
      password: ['', Validators.required],
      realName: [''],
      roles: [[], CreateUserComponent.mustHaveAtLeastOneRole]
    });
  }

  ngOnInit() {
  }

  private checkUsernameUniqueness(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return this.userService.checkUsernameExists(control.value).toPromise().then(result => {
        return result ? {'usernameAlreadyExists': {value: true}} : null;
      }, () => {
        return {'usernameCheckError': {value: true}};
      });
    };
  }

  createUser(createUserForm: FormGroup) {
    if (!CreateUserComponent.hasErrors(createUserForm)) {
      this.fillUser();
      this.userService.createUser(this.user).subscribe(user => {
        this.notifications.pushNotification('User has been created');
      });
    }
  }

  private static hasErrors(createUserForm: FormGroup): boolean {
    for (let key in createUserForm.controls) {
      let control = createUserForm.controls[key];
      if (control.errors) {
        return true;
      }
    }
    return false;
  }

  discardChanges() {
    this.user = CreateUserComponent.newUser();
    this.createUserForm.controls['username'].setValue(null);
    this.createUserForm.controls['password'].setValue(null);
    this.createUserForm.controls['roles'].setValue([]);
    this.createUserForm.controls['realName'].setValue(null);
  }

  private static newUser() {
    const user = new User(null, null);
    user.roles = [];
    return user;
  }

  removeRole(role: Role) {
    const index = this.user.roles.indexOf(role);
    this.user.roles.splice(index, 1);
    this.createUserForm.controls['roles'].setValue(this.user.roles);
  }

  selected($event: MatAutocompleteSelectedEvent) {
    this.user.roles.push($event.option.viewValue as Role);
    this.createUserForm.controls['roles'].setValue(this.user.roles);
    this.roleInput.nativeElement.value = '';
    this.filteredRoles = this.getSelectableRoles(null);
  }

  getSelectableRoles(inputValue: string) {
    const byExistingRoles = this.roles.filter(r => !this.user.roles.find(role => r == role));
    if (inputValue) {
      return byExistingRoles.filter(r => r.toString().toLowerCase().includes(inputValue.toLowerCase()));
    } else {
      return byExistingRoles;
    }
  }

  filterRoles($event: Event) {
    const inputValue = $event['data'];
    this.filteredRoles = this.getSelectableRoles(inputValue);
  }

  getClassForRole(role: Role) {
    switch (role) {
      case Role.Moderator:
        return 'moderator';
      case Role.Admin:
        return 'admin';
      case Role.User:
        return 'user';
    }
  }

  private static mustHaveAtLeastOneRole(control: AbstractControl): ValidationErrors | null {
    return control.value.length > 0 ? null : {'empty': {value: true}};
  }

  private fillUser() {
    this.user.username = this.createUserForm.controls['username'].value;
    this.user.roles = this.createUserForm.controls['roles'].value;
    this.user.realName = this.createUserForm.controls['realName'].value;
    this.user.password = this.createUserForm.controls['password'].value;
  }
}
