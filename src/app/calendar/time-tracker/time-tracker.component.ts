import {Component, OnInit} from '@angular/core';
import {Project} from '../../model/Project';
import {SatDatepickerRangeValue} from 'saturn-datepicker';
import {Role, User} from '../../model/User';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {UserService} from '../../user.service';
import {NotificationsService} from '../../notifications.service';
import {WorktimeRequest} from '../../model/WorktimeRequest';
import {WorktimeRequestService} from '../../worktime.service';
import {ProjectService} from '../../project.service';

@Component({
  selector: 'app-time-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.scss']
})
export class TimeTrackerComponent implements OnInit {
  public worktimeRequest: WorktimeRequest = new WorktimeRequest();
  public dateRange: SatDatepickerRangeValue<Date> = {
    begin: new Date(),
    end: new Date()
  };
  public reviewers: User[];
  public projects: Project[];
  public worktimeRequestForm: FormGroup;

  constructor(private userService: UserService,
              private worktimeRequestService: WorktimeRequestService,
              private notifications: NotificationsService,
              private projectService: ProjectService) {
  }

  ngOnInit() {
    this.worktimeRequestForm = new FormGroup({
      type: new FormControl('', [Validators.required]),
      dates: new FormControl('', [Validators.required]),
      reviewer: new FormControl('', [Validators.required]),
      project: new FormControl('', [Validators.required]),
      hours: new FormControl('', [Validators.required, TimeTrackerComponent.hoursNumberValidation]),
      description: new FormControl('', [])
    });
    let projection = ['id', 'realName', 'username'];
    this.userService.getByFilter({roles: {operator: 'IN', value: [Role.Admin, Role.Moderator]}}, projection).subscribe(users => {
      this.reviewers = users;
    });
    this.projectService.getByUserId(UserService.getCurrentUserId()).subscribe(projects => {
      if (projects.length > 0) {
        this.projects = projects;
      } else {
        this.projects = [{
          description: 'No project',
          name: 'Idle'
        }];
      }
    });
    this.setDatesToTimeRequest();
    this.worktimeRequestForm.controls['dates'].setValue(this.dateRange);
    this.worktimeRequest.userId = UserService.getCurrentUserId();
  }

  setDatesToTimeRequest() {
    const now = new Date();
    let beginDate = this.worktimeRequestForm.controls['dates'].value.begin;
    let endDate = this.worktimeRequestForm.controls['dates'].value.end;
    this.worktimeRequest.startDate = beginDate ? beginDate : now;
    this.worktimeRequest.endDate = endDate ? endDate : now;
  }

  sendTimeRequest(form: FormGroup) {
    if (!form.errors) {
      this.worktimeRequestService.create(this.worktimeRequest).subscribe(result => {
        console.log(result);
        this.notifications.alert('Worktime has been logged');
      });
    }
  }

  hasError(controlName: string, errorType: string): boolean {
    return this.worktimeRequestForm.controls[controlName].hasError(errorType);
  }

  private static hoursNumberValidation(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    return Number.isInteger(value) && value > 0 && value <= 24 ? null : {'invalidHoursNumber': {value: true}};
  }
}
