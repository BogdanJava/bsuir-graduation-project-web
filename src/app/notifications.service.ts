import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private snackBar: MatSnackBar) {
  }

  public pushNotification(message: string, action?: string, duration?: number) {
    this.snackBar.open(message, action ? action : 'Close', {
      duration: duration ? duration : 3000
    });
  }
}
