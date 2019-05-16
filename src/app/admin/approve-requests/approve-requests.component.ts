import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RequestStatus, TimeRequest} from '../../model/TimeRequest';
import {WorktimeRequest} from '../../model/WorktimeRequest';
import {TimeRequestService} from '../../time-request.service';
import {WorktimeRequestService} from '../../worktime.service';
import {UserService} from '../../user.service';
import {User} from '../../model/User';
import {Subscription} from 'rxjs';
import {ProjectService} from '../../project.service';
import {Project} from '../../model/Project';
import {NotificationsService} from '../../notifications.service';
import {DataFilter, FilterEntry, Operator, operatorName} from '../../model/DataFilter';
import {MatExpansionPanel} from '@angular/material';
import {ReflectionUtils} from '../../model/ReflectionUtils';

@Component({
  selector: 'app-approve-requests',
  templateUrl: './approve-requests.component.html',
  styleUrls: ['./approve-requests.component.scss']
})
export class ApproveRequestsComponent implements OnInit {
  timeRequests: TimeRequest[];
  worktimeRequests: WorktimeRequest[];

  userIdToUserMap: Map<string, User> = new Map();
  projectIdToProjectMap: Map<string, Project> = new Map();

  worktimeRequestsUsersLoaded: boolean = false;
  projectsLoaded: boolean = false;
  timeRequestsUsersLoaded: boolean = false;

  status: string = 'PENDING';
  startDate: Date;
  endDate: Date;

  filter: DataFilter = new DataFilter();
  timeRequestsLoading: boolean = false;
  worktimeRequestsLoading: boolean = false;

  constructor(private timeRequestService: TimeRequestService,
              private worktimeRequestService: WorktimeRequestService,
              private userService: UserService,
              private projectService: ProjectService,
              private notifications: NotificationsService) {
  }

  load() {
    this.clearData();
    this.timeRequestsLoading = true;
    this.timeRequestService.getByFilter(this.filter.toQueryObject()).subscribe(timeRequests => {
      this.timeRequests = timeRequests.map(timeRequestRaw => ReflectionUtils.getInstanceFromRawObject(timeRequestRaw, TimeRequest));
      this.fetchUserRealNames(timeRequests.map(t => t.userId)).add(() => {
        this.timeRequestsUsersLoaded = true;
      });
    }).add(() => this.timeRequestsLoading = false);
    this.worktimeRequestsLoading = true;
    this.worktimeRequestService.getByFilter(this.filter.toQueryObject()).subscribe(worktimeRequests => {
      this.worktimeRequests = worktimeRequests.map(worktimeRequestRaw =>
        ReflectionUtils.getInstanceFromRawObject(worktimeRequestRaw, WorktimeRequest));
      this.fetchUserRealNames(worktimeRequests.map(it => it.userId)).add(() => {
        this.worktimeRequestsUsersLoaded = true;
      });
      this.fetchProjects(worktimeRequests.map(it => it.projectId)).add(() => {
        this.projectsLoaded = true;
      });
    }).add(() => this.worktimeRequestsLoading = false);
  }

  ngOnInit() {
    const currentUserId = UserService.getCurrentUserId();
    this.filter.add(new FilterEntry('approverId', Operator.EQ, currentUserId));
    this.setFilterValues();
    this.load();
  }

  fetchUserRealNames(userIds: string[]): Subscription {
    return this.userService.getByFilter({id: {operator: 'IN', value: userIds}},
      ['id', 'realName', 'photoUrl']).subscribe(users => {
      users.forEach(user => {
        this.userIdToUserMap.set(user.id, user);
      });
    });
  }

  user(userId: string) {
    return this.userIdToUserMap.get(userId);
  }

  configureUserAvatar(request: TimeRequest | WorktimeRequest) {
    return {
      backgroundImage: 'url(' + this.user(request.userId).photoUrl + ')',
      backgroundSize: 'cover'
    };
  }

  getRequestTypeText(type: string) {
    return TimeRequest.getRequestTypeText(type);
  }

  project(projectId: string) {
    return this.projectIdToProjectMap.get(projectId);
  }

  processWorktimeRequest(requestId: string, approved: boolean) {
    this.worktimeRequestService.approveRequest(requestId, approved).subscribe(result => {
      this.notifications.alert(`Request has been ${ApproveRequestsComponent.statusString(result.status)}`);
      this.load();
    });
  }

  private static statusString(status: RequestStatus) {
    switch (status) {
      case RequestStatus.Approved:
        return 'approved';
      case RequestStatus.Declined:
        return 'declined';
      default:
        throw new Error('Incorrect status');
    }
  }

  processTimeRequest(requestId: string, approved: boolean) {
    this.timeRequestService.approveRequest(requestId, approved).subscribe(result => {
      this.notifications.alert(`Request has been ${ApproveRequestsComponent.statusString(result.status)}`);
      this.load();
    });
  }

  removeFilterEntry(entry: FilterEntry) {
    this.filter.remove(entry);
    this.load();
  }

  operatorName(operator: Operator) {
    return operatorName(operator);
  }

  noDataFound() {
    return (!this.worktimeRequestsLoading && !this.timeRequestsLoading) &&
      !(this.worktimeRequests && this.worktimeRequests.length > 0) &&
      !(this.timeRequests && this.timeRequests.length > 0);
  }

  applyFilter(filterPanel: MatExpansionPanel) {
    this.setFilterValues();
    filterPanel.close();
    this.load();
  }

  private fetchProjects(projectIds: string[]): Subscription {
    return this.projectService.getByFilter({id: {operator: 'IN', value: projectIds}},
      ['id', 'name']).subscribe(projects => {
      projects.forEach(project => {
        this.projectIdToProjectMap.set(project.id, project);
      });
    });
  }

  private clearData() {
    this.timeRequests = [];
    this.worktimeRequests = [];
    this.userIdToUserMap = new Map();
    this.projectIdToProjectMap = new Map();
    this.worktimeRequestsUsersLoaded = false;
    this.timeRequestsUsersLoaded = false;
    this.projectsLoaded = false;
  }

  private setFilterValues() {
    if (this.status && this.status != 'ANY') {
      this.filter.add(new FilterEntry('status', Operator.EQ, this.status));
    } else {
      this.filter.remove(this.filter.getFilterList().find(e => e.field === 'status'));
    }
  }
}
