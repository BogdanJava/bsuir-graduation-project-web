import {Component} from '@angular/core';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  toggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
    document.getElementById('sidenavList').focus();
  }
}
