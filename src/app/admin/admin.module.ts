import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProjectsComponent} from '../projects/projects.component';
import {ManageUsersComponent} from './users/manage-users.component';
import {RouterModule} from '@angular/router';
import {AdminConsoleComponent} from './admin-console/admin-console.component';
import {ApproveRequestsComponent} from './approve-requests/approve-requests.component';
import {AdminConsoleWrapperComponent} from './admin-console-wrapper/admin-console-wrapper.component';
import {AppModule} from '../app.module';
import {CreateUserComponent} from './users/create-user/create-user.component';
import {UserTableComponent} from './users/user-table/user-table.component';
import {MatTableModule} from '@angular/material';

@NgModule({
  declarations: [
    ManageUsersComponent,
    ProjectsComponent,
    AdminConsoleComponent,
    ApproveRequestsComponent,
    AdminConsoleWrapperComponent,
    CreateUserComponent,
    UserTableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatTableModule,
  ]
})
export class AdminModule {
}
