import {Component, OnInit} from '@angular/core';
import {TimeRequest} from '../../model/TimeRequest';
import {WorktimeRequest} from '../../model/WorktimeRequest';
import {TimeRequestService} from '../../time-request.service';
import {WorktimeRequestService} from '../../worktime.service';
import {UserService} from '../../user.service';
import {User} from '../../model/User';

@Component({
  selector: 'app-approve-requests',
  templateUrl: './approve-requests.component.html',
  styleUrls: ['./approve-requests.component.scss']
})
export class ApproveRequestsComponent implements OnInit {
  startDate: Date = new Date();
  endDate: Date = new Date();
  timeRequests: TimeRequest[];
  worktimeRequests: WorktimeRequest[];
  userIdToUserFullNameMap: Map<string, User> = new Map();

  constructor(private timeRequestService: TimeRequestService,
              private worktimeRequestService: WorktimeRequestService,
              private userService: UserService) {
  }

  ngOnInit() {
    const currentUserId = UserService.getCurrentUserId();
    const filter = {approverId: {operator: 'EQ', value: currentUserId}};
    this.timeRequestService.getByFilter(filter).subscribe(timeRequests => {
      this.fetchUserRealNames(timeRequests.map(t => t.userId), () => {
        this.timeRequests = timeRequests;
      });
    });
    this.worktimeRequestService.getByFilter(filter).subscribe(worktimeRequests => {
      this.fetchUserRealNames(worktimeRequests.map(t => t.userId), () => {
        this.worktimeRequests = worktimeRequests;
      });
    });
  }

  fetchUserRealNames(userIds: string[], callback) {
    this.userService.getByFilter({id: {operator: 'IN', value: userIds}},
      ['id', 'realName', 'photoUrl']).subscribe(users => {
      users.forEach(user => {
        this.userIdToUserFullNameMap.set(user.id, user);
      });
      callback();
    });
  }

  user(userId: string) {
    return this.userIdToUserFullNameMap.get(userId);
  }

  configureUserAvatar(request: TimeRequest | WorktimeRequest) {
    return {
      backgroundImage: 'url(' + this.user(request.userId).photoUrl + ')',
      backgroundSize: 'cover'
    };
  }
}
