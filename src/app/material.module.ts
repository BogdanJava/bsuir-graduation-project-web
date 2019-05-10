import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule, MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule,
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
    SatNativeDateModule,
    MatSelectModule,
    MatMenuModule,
    MatChipsModule,
    MatPaginatorModule
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
    SatNativeDateModule,
    MatSelectModule,
    MatMenuModule,
    MatChipsModule,
    MatPaginatorModule
  ]
})
export class MaterialModule {
}
