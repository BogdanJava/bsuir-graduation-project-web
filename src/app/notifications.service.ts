import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {NotificationsService as _notificationsService, NotificationType} from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private snackBar: MatSnackBar,
              private notifications: _notificationsService) {
  }

  public alert(message: string, action?: string, duration?: number) {
    this.snackBar.open(message, action ? action : 'Close', {
      duration: duration ? duration : 3000
    });
  }

  public notification(title: string, text: string, type: NotificationType, options?: any) {
    this.notifications.create(title, text, type, options)
  }
}
