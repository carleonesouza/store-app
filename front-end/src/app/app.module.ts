import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { StoreAppMaterialModule } from '../store-app-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FrontStoreComponent } from '../front-store/front-store.component';
import { AppComponent } from './app.component';
import { HomeComponent } from '../home/home.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { CreateProductComponent } from '../create-product/create-product.component';
import { SplashComponent } from '../splash/splash.component';
import {DataService} from '../services/data.service';
import {AddDialogComponent} from '../dialogs/add/add.dialog.component';
import {EditDialogComponent} from '../dialogs/edit/edit.dialog.component';
import {DeleteDialogComponent} from '../dialogs/delete/delete.dialog.component';

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
  ],
  providers: [DataService],
  entryComponents: [
    AppComponent,
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent
],
  exports: [ SplashComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
