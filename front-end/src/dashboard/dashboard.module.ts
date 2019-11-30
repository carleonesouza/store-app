import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';
import { StoreAppMaterialModule } from '../store-app-material-module';

import { ViewUserAdmComponent } from './view-user-adm/view-user-adm.component';

@NgModule({
  declarations: [
    ViewUserAdmComponent
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
  entryComponents: [ViewUserAdmComponent]
})
export class DashboardAppModule {
  static UserRoutes: Routes = [
      { path: 'admin', component: ViewUserAdmComponent},
  ];
}
