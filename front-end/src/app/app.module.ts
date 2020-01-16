import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreAppMaterialModule} from '../store-app-material-module';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatNativeDateModule, MatIconRegistry, MAT_DIALOG_DATA } from '@angular/material';

import { AppComponent } from './app.component';
import { SplashComponent } from './splash.component';
import { BaseComponent } from './base.component';
import { AppRoutingModule } from './app-routing.module';
import { ChartsModule } from 'ng2-charts';
import { AccountModule } from '../account/account.module';
import { AdminModule } from '../pages/admin/admin.module';
import { VendorModule } from '../pages/vendor/vendor.module';

import { StoreAppService} from '../services/store-app.service';
import { ManagementService } from 'src/services/management.service';
import { AuthService } from '../services/auth.service';
import { VendorService } from 'src/services/vendor.service';
import { ProductService } from 'src/services/product.service';
import { LoggedInGuard } from '../guards/logged-in.guard';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { AuthGuard } from '../guards/auth.guard';
import { HomeComponent } from 'src/pages/home/home.component';
import { DatepickerComponent } from 'src/pages/datepicker/datepicker.component';
import { HandleError } from 'src/services/handleError';
import { FrontStoreComponent } from 'src/pages/front-store/front-store.component';
import { NotFoundComponent } from 'src/pages/not-found/not-found.component';
import { ConfirmationDialogComponent } from 'src/pages/dialogs/confirmation/confirmation-dialog.component';
import { BillDialogComponent } from 'src/pages/dialogs/bill-dialog/bill-dialog.component';
import { WalletDialogComponent } from 'src/pages/dialogs/wallet-dialog/wallet-dialog.component';


@NgModule({
    declarations: [
        SplashComponent,
        AppComponent,
        BaseComponent,
        HomeComponent,
        FrontStoreComponent,
        ConfirmationDialogComponent,
        BillDialogComponent,
        WalletDialogComponent,
        NotFoundComponent,
        DatepickerComponent,


    ],

    imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        StoreAppMaterialModule,
        AppRoutingModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        ChartsModule,
        AccountModule,
        AdminModule,
        VendorModule,
    ],

    providers: [
        { provide: MAT_DIALOG_DATA, useValue: { minWidth: 325, hasBackdrop: true } },
        { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { minWidth: 325, hasBackdrop: true } },
        ManagementService,
        VendorService,
        ProductService,
        HandleError,
        StoreAppService,
        AuthService,
        LoggedInGuard,
        AuthGuard
    ],

    entryComponents: [
        AppComponent, ConfirmationDialogComponent, BillDialogComponent, WalletDialogComponent
    ],

    exports: [ SplashComponent ],
    bootstrap: [ SplashComponent ]
})
export class AppModule {
    constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
        matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('/assets/mdi.svg'));
    }
}
