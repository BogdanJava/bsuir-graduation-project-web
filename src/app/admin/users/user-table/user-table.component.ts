import {Component, OnInit} from '@angular/core';
import {User} from '../../../model/User';
import {UserService} from '../../../user.service';
import {Operator} from '../../../model/DataFilter';
import {MatTableParams} from '../../../model/MatTableParams';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  users: User[];
  displayedColumns: string[] = ['realName', 'username', 'id'];

  tableParams: MatTableParams = new MatTableParams();

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    let filter = {deleted: {operator: Operator.EQ, value: false}};
    let projection = ['realName', 'username', 'id', 'photoUrl'];
    this.userService.getByFilter(filter, projection).subscribe(users => {
      this.users = users;
    });
  }

  configureAvatar(photoUrl: string) {
    return {
      backgroundImage: `url(${photoUrl})`,
      backgroundSize: 'cover'
    };
  }
}
