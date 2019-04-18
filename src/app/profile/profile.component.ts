import {Component, OnInit} from '@angular/core';
import {TabItem} from '../model/TabItem';
import {NavigationEnd, Router} from '@angular/router';

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

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    if (this.router.url == '/profile') {
      this.router.navigateByUrl(`${this.router.url}/contact`);
    }
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        if (e.url === '/profile') {
          this.router.navigateByUrl(`${this.router.url}/contact`);
        }
      }
    });
  }

}
