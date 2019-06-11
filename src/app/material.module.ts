import {ErrorHandler, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDatepickerModule, MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {SatDatepickerModule, SatNativeDateModule} from 'saturn-datepicker';
import {GlobalExceptionHandlingService} from './global-exception-handling.service';

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
    MatPaginatorModule,
    MatAutocompleteModule,
    MatDialogModule
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
    MatPaginatorModule,
    MatAutocompleteModule,
    MatDialogModule
  ],
  providers: [{provide: GlobalExceptionHandlingService, useClass: ErrorHandler}]
})
export class MaterialModule {
}
