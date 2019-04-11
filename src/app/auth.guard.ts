import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from './user.service';
import {AuthenticationService} from './authentication.service';
import {NotificationsService} from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService,
              private router: Router,
              private notificationsService: NotificationsService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (AuthenticationService.isTokenExpired()) {
      this.router.navigateByUrl('/login');
      this.notificationsService.pushNotification('Session has expired');
      return false;
    } else {
      return true;
    }
  }

}
