import {Component, OnInit} from '@angular/core';
import {TimeRequest} from '../../model/TimeRequest';
import {SatDatepickerRangeValue} from 'saturn-datepicker';
import {Role, User} from '../../model/User';
import {UserService} from '../../user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TimeRequestService} from '../../time-request.service';
import {NotificationsService} from '../../notifications.service';

@Component({
  selector: 'app-out-of-office',
  templateUrl: './out-of-office.component.html',
  styleUrls: ['./out-of-office.component.scss']
})
export class OutOfOfficeComponent implements OnInit {
  public timeRequest: TimeRequest = new TimeRequest();
  public dateRange: SatDatepickerRangeValue<Date> = {
    begin: new Date(),
    end: new Date()
  };
  public reviewers: User[];
  public oooForm: FormGroup;

  constructor(private userService: UserService,
              private timeRequestService: TimeRequestService,
              private notifications: NotificationsService) {
  }

  ngOnInit() {
    this.oooForm = new FormGroup({
      type: new FormControl('', [Validators.required]),
      dates: new FormControl('', [Validators.required]),
      reviewer: new FormControl('', [Validators.required]),
      description: new FormControl('', [])
    });
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
    this.setDatesToTimeRequest();
    this.oooForm.controls['dates'].setValue(this.dateRange);
    this.timeRequest.userId = UserService.getCurrentUserId();
  }

  setDatesToTimeRequest() {
    this.timeRequest.startDate = this.oooForm.controls['dates'].value.begin;
    this.timeRequest.endDate = this.oooForm.controls['dates'].value.end;
  }

  sendTimeRequest(form: FormGroup) {
    if (!form.errors) {
      this.timeRequestService.create(this.timeRequest).subscribe(result => {
        console.log(result);
        this.notifications.pushNotification('Time request created');
      });
    }
  }

  hasError(controlName: string, errorType: string): boolean {
    return this.oooForm.controls[controlName].hasError(errorType);
  }
}
