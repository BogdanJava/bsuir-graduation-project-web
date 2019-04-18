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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
