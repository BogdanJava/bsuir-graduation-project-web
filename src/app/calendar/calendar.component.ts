import { Component, OnInit } from '@angular/core';
import {TabItem} from '../model/TabItem';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  public tabs: TabItem[] = [
    new TabItem('Time tracker', 'timeline', 'timetracker'),
    new TabItem('Out Of Office', 'card_travel', 'ooo'),
    new TabItem('Other requests', 'work_off', 'other')
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.router.url == '/calendar') {
      this.router.navigateByUrl(`${this.router.url}/timetracker`);
    }
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        if (e.url === '/calendar') {
          this.router.navigateByUrl(`${this.router.url}/timetracker`);
        }
      }
    });
  }

}
