import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';
import { StoreAppMaterialModule } from '../store-app-material-module';


import { FrontStoreComponent } from './front-store/front-store.component';
import { AddDialogComponent } from './dialogs/add/add.dialog.component';
import { EditDialogComponent } from './dialogs/edit/edit.dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.dialog.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { SplashComponent } from './splash/splash.component';
import { BillDialogComponent } from './dialogs/bill-dialog/bill-dialog.component';
import { ConfirmationDialogComponent } from './dialogs/confirmation/confirmation-dialog.component';



@NgModule({
  declarations: [
    FrontStoreComponent,
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    CreateProductComponent,
    SplashComponent,
    BillDialogComponent,
    ConfirmationDialogComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ChartsModule,
    StoreAppMaterialModule,

  ],
  providers: [],
  exports: [ SplashComponent ],
  entryComponents: [
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    BillDialogComponent,
    ConfirmationDialogComponent
  ]
})
export class ProductAppModule {
  static ProductRoutes: Routes = [
    { path: 'front-store', component: FrontStoreComponent },
    { path: 'create-product', component: CreateProductComponent },
  ];
}
