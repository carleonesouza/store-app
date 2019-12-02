import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';
import { StoreAppMaterialModule } from '../store-app-material-module';
import { DashboardAppModule } from '../dashboard/dashboard.module';
import { ProductAppModule } from 'src/product-app/product-app.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { ProductService } from '../services/product.service';
import { VendorService } from '../services/vendor.service';
import { BagVenders } from 'src/models/bag-venders';
import { HandleError } from 'src/services/handleError';
import { ManagementService } from 'src/services/management.service';
import { SignInComponent } from '../loggin/sign-in/sign-in.component';
import { SignUpComponent } from '../loggin/sign-up/sign-up.component';
import { BaseComponent } from './base.component';




@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    SignInComponent,
    SignUpComponent,
    BaseComponent
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
    DashboardAppModule,
    ProductAppModule,
    ChartsModule,
  ],
  providers: [ProductService, VendorService,
     BagVenders, HandleError, ManagementService],
  entryComponents: [
    AppComponent
],
  bootstrap: [AppComponent]
})
export class AppModule { }
