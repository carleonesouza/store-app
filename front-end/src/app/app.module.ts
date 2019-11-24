import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { StoreAppMaterialModule } from '../store-app-material-module';
import { FrontStoreComponent } from '../front-store/front-store.component';
import { AppComponent } from './app.component';
import { HomeComponent } from '../home/home.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { CreateProductComponent } from '../create-product/create-product.component';
import { SplashComponent } from '../splash/splash.component';
import { ProductService } from '../services/product.service';
import { AddDialogComponent } from '../dialogs/add/add.dialog.component';
import { EditDialogComponent } from '../dialogs/edit/edit.dialog.component';
import { DeleteDialogComponent } from '../dialogs/delete/delete.dialog.component';
import { VendorService } from '../services/vendor.service';
import { BillDialogComponent } from '../dialogs/bill-dialog/bill-dialog.component';
import { ConfirmationDialogComponent } from 'src/dialogs/confirmation/confirmation-dialog.component';
import { BagVenders } from 'src/models/bag-venders';
import { HandleError } from 'src/services/handleError';
import { ManagementService } from 'src/services/management.service';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { SignInComponent } from '../loggin/sign-in/sign-in.component';
import { SignUpComponent } from '../loggin/sign-up/sign-up.component';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    FrontStoreComponent,
    HomeComponent,
    NotFoundComponent,
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    CreateProductComponent,
    SplashComponent,
    SignInComponent,
    SignUpComponent,
    BillDialogComponent,
    ConfirmationDialogComponent,
    DatepickerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreAppMaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    ChartsModule,
  ],
  providers: [ProductService, VendorService,
     BagVenders, HandleError, ManagementService],
  entryComponents: [
    AppComponent,
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    BillDialogComponent,
    ConfirmationDialogComponent
],
  exports: [ SplashComponent ],
  bootstrap: [SignInComponent]
})
export class AppModule { }
