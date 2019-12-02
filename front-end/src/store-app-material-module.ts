import { NgModule } from '@angular/core';
import {
    MatCommonModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatCardModule,
//     MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
//     MatProgressBarModule,
    MatProgressSpinnerModule,
//     MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { A11yModule } from '@angular/cdk/a11y';
import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { ObserversModule } from '@angular/cdk/observers';
import { PortalModule } from '@angular/cdk/portal';
// import {MatTableModule} from '@angular/material/table';

/**
 * NgModule that includes all Material modules that are required to serve the app.
 */
@NgModule({
    exports: [
        MatCommonModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatDividerModule,
        MatButtonToggleModule,
        MatCardModule,
//         MatCheckboxModule,
        MatChipsModule,
        MatTableModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatPaginatorModule,
//         MatProgressBarModule,
        MatProgressSpinnerModule,
//         MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatSliderModule,
        MatSnackBarModule,
        MatSortModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatNativeDateModule,
        CdkTableModule,
        A11yModule,
        BidiModule,
        ObserversModule,
        OverlayModule,
        PlatformModule,
        PortalModule
    ]
})
export class StoreAppMaterialModule { }
