import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';
import { JwtModule } from '@auth0/angular-jwt';
import { StoreAppMaterialModule } from '../store-app-material-module';
import { DashboardAppModule } from '../dashboard/dashboard.module';
import { ProductAppModule } from 'src/product-app/product-app.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { ProductService } from '../services/product.service';
import { VendorService } from '../services/vendor.service';
import { HandleError } from 'src/services/handleError';
import { SignInComponent } from '../loggin/sign-in/sign-in.component';
import { BaseComponent } from './base.component';
import { httpInterceptorProviders } from '../http-interceptors/index';
import { AuthService } from '../services/auth.service';
import { HomeSplashComponent } from './home-splash.component';
import { AuthGuard } from 'src/guards/auth.guard';
import { ManagementService } from 'src/services/management.service';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    SignInComponent,
    BaseComponent,
    HomeSplashComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('mSessionId');
        },
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: ['localhost:3000/api/management/login']
      }
    }),
    ReactiveFormsModule,
    StoreAppMaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    DashboardAppModule,
    ProductAppModule,
    ChartsModule,
  ],
  providers: [
    ProductService,
    VendorService,
    httpInterceptorProviders,
    ManagementService,
    HandleError,
    AuthService,
    AuthGuard],
  entryComponents: [AppComponent],
  bootstrap: [SignInComponent]
})
export class AppModule { }
