import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationComponent} from './authentication/authentication/authentication.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  {path: 'login', component: AuthenticationComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
