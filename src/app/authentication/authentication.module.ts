import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthenticationComponent} from './authentication/authentication.component';
import {HelpComponent} from './help/help.component';
import {MaterialModule} from '../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [AuthenticationComponent, HelpComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthenticationModule {
}
