import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {AuthenticationModule} from './authentication/authentication.module';
import {HeaderComponent} from './header/header.component';
import {SidenavListComponent} from './sidenav-list/sidenav-list.component';
import {HttpClientModule} from '@angular/common/http';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ContactInfoComponent} from './profile/contact-info/contact-info.component';
import {SecuritySettingsComponent} from './profile/security/security-settings.component';
import {PasswordComponent} from './profile/security/password/password.component';
import {CalendarComponent} from './calendar/calendar.component';
import {OutOfOfficeComponent} from './calendar/out-of-office/out-of-office.component';
import {TimeTrackerComponent} from './calendar/time-tracker/time-tracker.component';
import {OtherRequestsComponent} from './calendar/other-requests/other-requests.component';
import {AdminModule} from './admin/admin.module';
import {TimelineComponent} from './timeline/timeline.component';
import {HelpComponent} from './help/help.component';
import {TasksComponent} from './tasks/tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    HomeComponent,
    ProfileComponent,
    ContactInfoComponent,
    SecuritySettingsComponent,
    PasswordComponent,
    CalendarComponent,
    OutOfOfficeComponent,
    TimeTrackerComponent,
    OtherRequestsComponent,
    TimelineComponent,
    HelpComponent,
    TasksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    AuthenticationModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AdminModule
  ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
