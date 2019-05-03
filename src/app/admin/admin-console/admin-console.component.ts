import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-admin-console',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.scss']
})
export class AdminConsoleComponent implements OnInit {

  public cards = [
    {name: 'Projects', icon: 'laptop', ref: 'projects'},
    {name: 'Users', icon: 'account_box', ref: 'users'},
    {name: 'Approve requests', icon: 'dashboard', ref: 'approve'}
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
