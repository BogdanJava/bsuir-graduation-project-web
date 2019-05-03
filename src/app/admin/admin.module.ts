import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProjectsComponent} from '../projects/projects.component';
import {ManageUsersComponent} from './create-user/manage-users.component';
import {RouterModule} from '@angular/router';
import {AdminConsoleComponent} from './admin-console/admin-console.component';
import {ApproveRequestsComponent} from './approve-requests/approve-requests.component';
import {AdminConsoleWrapperComponent} from './admin-console-wrapper/admin-console-wrapper.component';

@NgModule({
  declarations: [
    ManageUsersComponent,
    ProjectsComponent,
    AdminConsoleComponent,
    ApproveRequestsComponent,
    AdminConsoleWrapperComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class AdminModule {
}
