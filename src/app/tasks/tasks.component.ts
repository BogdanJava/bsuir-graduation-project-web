import {Component, OnInit} from '@angular/core';
import {MatExpansionPanel} from '@angular/material';
import {DataFilter, FilterEntry} from '../model/DataFilter';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasksLoading: boolean = false;
  startDate: Date;
  filter: DataFilter = new DataFilter();
  personName: string;

  constructor() {
  }

  ngOnInit() {
  }

  load() {

  }

  applyFilter(filterPanel: MatExpansionPanel) {

  }

  displayEntry(entry: FilterEntry) {

  }

  removeFilterEntry(entry: FilterEntry) {

  }
}
