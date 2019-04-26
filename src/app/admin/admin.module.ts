import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminConsoleComponent} from './admin-console/admin-console.component';
import {MaterialModule} from '../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ApproveRequestComponent} from './approve-request/approve-request.component';
import {ProjectsComponent} from '../projects/projects.component';
import {ManageUsersComponent} from './create-user/manage-users.component';
import {RouterModule} from '@angular/router';
import { AdminConsoleWrapperComponent } from './admin-console-wrapper/admin-console-wrapper.component';

@NgModule({
  declarations: [AdminConsoleComponent, ManageUsersComponent, ApproveRequestComponent, ProjectsComponent, AdminConsoleWrapperComponent],
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
