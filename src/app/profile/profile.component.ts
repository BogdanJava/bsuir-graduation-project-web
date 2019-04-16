import {Component, OnInit} from '@angular/core';
import {TabItem} from '../model/TabItem';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public tabs: TabItem[] = [
    new TabItem('Contact info', 'account_circle', 'contact'),
    new TabItem('Security settings', 'security', 'security')
  ];

  ngOnInit(): void {
  }

}
