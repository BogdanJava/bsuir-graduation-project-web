import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../model/User';
import {UserService} from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output()
  private clickMenuButtonEventEmitter = new EventEmitter();

  constructor(private userService: UserService) {
  }

  ngOnInit() {

  }

  toggleSidenav() {
    this.clickMenuButtonEventEmitter.emit();
  }
}
