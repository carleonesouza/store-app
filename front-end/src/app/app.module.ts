import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreAppMaterialModule} from '../store-app-material-module';
import { MatIconRegistry } from '@angular/material/icon'
import { MAT_DIALOG_DEFAULT_OPTIONS, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { SplashComponent } from './splash.component';
import { BaseComponent } from './base.component';
import { AppRoutingModule } from './app-routing.module';
import { ChartsModule } from 'ng2-charts';
import { AccountModule } from '../account/account.module';
import { AdminModule } from '../pages/admin/admin.module';
import { VendorModule } from '../pages/vendor/vendor.module';

import { StoreAppService} from '../services/store-app.service';
import { AuthService } from '../services/auth.service';
import { VendorService } from '../services/vendor.service';
import { ProductService } from '../services/product.service';
import { LoggedInGuard } from '../guards/logged-in.guard';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { AuthGuard } from '../guards/auth.guard';
import { HomeComponent } from '../pages/home/home.component';
import { DatepickerComponent } from '../pages/datepicker/datepicker.component';
import { HandleError } from '../services/handleError';
import { FrontStoreComponent } from '../pages/front-store/front-store.component';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { ConfirmationDialogComponent } from 'src/pages/dialogs/confirmation/confirmation-dialog.component';
import { BillDialogComponent } from '../pages/dialogs/bill-dialog/bill-dialog.component';
import { WalletDialogComponent } from '../pages/dialogs/wallet-dialog/wallet-dialog.component';
import { UserService } from 'src/services/user.service';
import { CloseCashierDialogComponent } from 'src/pages/dialogs/close-cashier/close-cashier-dialog.component';
import { DinamicTableComponent } from '../pages/dinamic-table/dinamic-table.component';
import { MatNativeDateModule } from '@angular/material/core';
import { CustomDirectiveDirective } from './custom-directive.directive';
import { ManagementService } from '../services/management.service';




@NgModule({
    declarations: [
        SplashComponent,
        AppComponent,
        BaseComponent,
        HomeComponent,
        FrontStoreComponent,
        ConfirmationDialogComponent,
        CloseCashierDialogComponent,
        BillDialogComponent,
        WalletDialogComponent,
        NotFoundComponent,
        DatepickerComponent,
        DinamicTableComponent,
        CustomDirectiveDirective,

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
        VendorService,
        ManagementService,
        UserService,
        ProductService,
        HandleError,
        StoreAppService,
        AuthService,
        LoggedInGuard,
        AuthGuard
    ],

    entryComponents: [
        AppComponent, CloseCashierDialogComponent,
        ConfirmationDialogComponent, BillDialogComponent,
        WalletDialogComponent
    ],

    exports: [ SplashComponent],
    bootstrap: [ SplashComponent ]
})
export class AppModule {
    constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
        matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('/assets/mdi.svg'));
    }
}
