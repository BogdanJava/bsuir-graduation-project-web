import {Component, OnInit} from '@angular/core';
import {MatTableParams} from '../../../model/MatTableParams';
import {PageEvent} from '@angular/material';
import {Project} from '../../../model/Project';
import {ProjectService} from '../../../project.service';
import {UserService} from '../../../user.service';
import {User} from '../../../model/User';

@Component({
  selector: 'app-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: ['./projects-table.component.scss']
})
export class ProjectsTableComponent implements OnInit {
  tableParams: MatTableParams = new MatTableParams();
  projects: Project[];
  userIdToUserMap: Map<string, Project>;
  displayedColumns: string[] = ['projectName', 'projectDescription', 'assignedPersonControl', 'id'];
  defaultPhoto = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Edit_icon_%28the_Noun_Project_30184%29.svg/1024px-Edit_icon_%28the_Noun_Project_30184%29.svg.png';

  constructor(private projectService: ProjectService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.configureTableParams();
    this.loadProjects(this.tableParams.pageSize, 0);
  }

  processChangeEvent(e: PageEvent) {
    this.loadProjects(e.pageSize, e.pageIndex);
  }


  configureTableParams() {
    this.tableParams.pageSizeOptions = [2, 10, 25, 50, 100];
    this.tableParams.pageSize = 25;
    this.projectService.getProjectsCount().subscribe(count => {
      this.tableParams.length = count;
    });
  }

  private loadProjects(pageSize: number, pageIndex: number) {
    const filter = {
      deleted: {operator: 'EQ', value: false}
    };
    const projection = ['id', 'name', 'assignedPersonsIds', 'description', 'photoUrl'];
    this.projectService.getByFilter(filter, projection, pageIndex, pageSize).subscribe(projects => {
      this.projects = projects;
      const assignedPersonIds = new Set();
      projects.forEach(p => {
        if (p.assignedPersonsIds) {
          p.assignedPersonsIds.forEach(ap => assignedPersonIds.add(ap));
        }
      });
      this.userService.getByFilter({id: {operator: 'IN', value: Array.from(assignedPersonIds)}}).subscribe(users => {
        this.userIdToUserMap = new Map<string, Project>();
        users.forEach(u => {
          this.userIdToUserMap.set(u.id, u);
        });
      });
    });
  }

  persons(project: Project): User[] {
    return project.assignedPersonsIds.map(id => this.userIdToUserMap.get(id));
  }

  configureAvatar(photoUrl: string) {
    return {
      backgroundImage: `url(${photoUrl ? photoUrl : this.defaultPhoto})`,
      backgroundSize: 'cover'
    };
  }

  dataLoaded(project: Project): boolean {
    for (let personId of project.assignedPersonsIds) {
      if (!this.userIdToUserMap || !this.userIdToUserMap.has(personId)) {
        return false;
      }
    }
    return true;
  }
}
