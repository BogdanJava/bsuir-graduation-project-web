import {Component, OnInit} from '@angular/core';
import {TimeRequest} from '../../model/TimeRequest';
import {SatDatepickerRangeValue} from 'saturn-datepicker';
import {Role, User} from '../../model/User';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-time-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.scss']
})
export class TimeTrackerComponent implements OnInit {
  public timeRequest: TimeRequest = new TimeRequest();
  public dateRange: SatDatepickerRangeValue<Date> = {
    begin: new Date(),
    end: new Date()
  };
  public reviewers: User[];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    let filter = {
      roles: {
        operator: 'IN',
        value: [Role.Admin, Role.Moderator]
      }
    };
    let projection = ['id', 'realName'];
    this.userService.getByFilter(filter, projection).subscribe(users => {
      this.reviewers = users;
    });
  }

  setDatesToTimeRequest() {
    this.timeRequest.startDate = this.dateRange.begin;
    this.timeRequest.endDate = this.dateRange.end;
    console.log(this.timeRequest);
  }
}
