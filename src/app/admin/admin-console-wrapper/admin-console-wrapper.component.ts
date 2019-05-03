import { Component, OnInit } from '@angular/core';
import {TimeRequestService} from '../../time-request.service';
import {WorktimeRequestService} from '../../worktime.service';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-admin-console-wrapper',
  templateUrl: './admin-console-wrapper.component.html',
  styleUrls: ['./admin-console-wrapper.component.scss']
})
export class AdminConsoleWrapperComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
