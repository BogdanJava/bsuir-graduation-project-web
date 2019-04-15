import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationComponent} from './authentication/authentication/authentication.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './authentication/auth.guard';
import {AuthorizedGuard} from './authentication/authorized.guard';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [
  {redirectTo: '/login', pathMatch: 'full', path: ''},
  {path: 'login', component: AuthenticationComponent, canActivate: [AuthorizedGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
