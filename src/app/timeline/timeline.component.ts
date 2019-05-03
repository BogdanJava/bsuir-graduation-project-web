import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  startDate: Date = new Date();
  endDate: Date = new Date();

  constructor() { }

  ngOnInit() {
  }

}
