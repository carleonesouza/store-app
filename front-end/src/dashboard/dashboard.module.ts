import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';
import { StoreAppMaterialModule } from '../store-app-material-module';
import { ProductAppModule } from 'src/product-app/product-app.module';

import { ViewUserAdmComponent } from './view-user-adm/view-user-adm.component';
import { HomeComponent } from './home/home.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { EditUserDialogComponent } from './dialogs-users/edit/edit-user.dialog.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
  declarations: [
    ViewUserAdmComponent,
    HomeComponent,
    DatepickerComponent,
    EditUserDialogComponent,
    UserProfileComponent
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
    ProductAppModule
  ],
  providers: [],
  entryComponents: [ViewUserAdmComponent, EditUserDialogComponent]
})
export class DashboardAppModule {
  static UserRoutes: Routes = [
      { path: 'home', component: HomeComponent},
      { path: 'users', component: ViewUserAdmComponent},
      { path: 'profile', component: UserProfileComponent},
      { path: 'products', children: ProductAppModule.ProductRoutes},
  ];
}
