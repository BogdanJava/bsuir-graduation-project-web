import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationComponent} from './authentication/authentication/authentication.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './authentication/auth.guard';
import {AuthorizedGuard} from './authentication/authorized.guard';
import {ProfileComponent} from './profile/profile.component';
import {ContactInfoComponent} from './profile/contact-info/contact-info.component';
import {SecuritySettingsComponent} from './profile/security/security-settings.component';
import {CalendarComponent} from './calendar/calendar.component';
import {OutOfOfficeComponent} from './calendar/out-of-office/out-of-office.component';
import {TimeTrackerComponent} from './calendar/time-tracker/time-tracker.component';
import {OtherRequestsComponent} from './calendar/other-requests/other-requests.component';
import {AdminConsoleComponent} from './admin/admin-console/admin-console.component';
import {ApproveRequestComponent} from './admin/approve-request/approve-request.component';
import {ManageUsersComponent} from './admin/create-user/manage-users.component';
import {ProjectsComponent} from './projects/projects.component';
import {AdminConsoleWrapperComponent} from './admin/admin-console-wrapper/admin-console-wrapper.component';

const routes: Routes = [
  {redirectTo: '/login', pathMatch: 'full', path: ''},
  {path: 'login', component: AuthenticationComponent, canActivate: [AuthorizedGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {
    path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
      {path: 'contact', component: ContactInfoComponent},
      {path: 'security', component: SecuritySettingsComponent}
    ]
  },
  {
    path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
      {path: 'ooo', component: OutOfOfficeComponent},
      {path: 'timetracker', component: TimeTrackerComponent},
      {path: 'other', component: OtherRequestsComponent}
    ]
  },
  {
    path: 'admin-console', component: AdminConsoleWrapperComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
      {path: 'approve', component: ApproveRequestComponent},
      {path: 'users', component: ManageUsersComponent},
      {path: 'projects', component: ProjectsComponent},
      {path: '', component: AdminConsoleComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
