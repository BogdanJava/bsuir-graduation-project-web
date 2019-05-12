import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../model/User';
import {UserService} from '../../../user.service';
import {Operator} from '../../../model/DataFilter';
import {MatTableParams} from '../../../model/MatTableParams';
import {MatPaginator, MatPaginatorIntl, MatTable, PageEvent} from '@angular/material';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  users: User[];
  displayedColumns: string[] = ['realName', 'username', 'id', 'roles'];

  tableParams: MatTableParams = new MatTableParams();
  filter: object;
  projection: string[];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.configureTableParams();
    this.filter = {deleted: {operator: Operator.EQ, value: false}};
    this.projection = ['realName', 'username', 'id', 'photoUrl', 'roles'];
    this.userService.getByFilter(this.filter, this.projection,
      0, this.tableParams.pageSize).subscribe(users => {
      this.users = users;
    });
  }

  configureAvatar(photoUrl: string) {
    return {
      backgroundImage: `url(${photoUrl})`,
      backgroundSize: 'cover'
    };
  }

  findUserRole(user: User, role: string) {
    return user.roles.find(r => r == role);
  }

  processChangeEvent(pageEvent: PageEvent) {
    this.userService.getByFilter(this.filter, this.projection,
      pageEvent.pageIndex, pageEvent.pageSize).subscribe(users => {
      this.users = users;
    });
  }

  private configureTableParams() {
    this.tableParams.pageSizeOptions = [10, 25, 50, 100];
    this.tableParams.pageSize = 25;
    this.userService.getUsersCount().subscribe(count => {
      this.tableParams.length = count;
    });
  }
}
