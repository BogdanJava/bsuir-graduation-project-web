import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {SatDatepickerModule, SatNativeDateModule} from 'saturn-datepicker';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatTabsModule,
    MatStepperModule,
    MatExpansionModule,
    SatDatepickerModule,
    SatNativeDateModule
  ],
  exports: [
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatTabsModule,
    MatStepperModule,
    MatExpansionModule,
    SatDatepickerModule,
    SatNativeDateModule
  ]
})
export class MaterialModule {
}
