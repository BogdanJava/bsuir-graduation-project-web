import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication/authentication.component';
import { HelpComponent } from './help/help.component';

@NgModule({
  declarations: [AuthenticationComponent, HelpComponent],
  imports: [
    CommonModule
  ]
})
export class AuthenticationModule { }
