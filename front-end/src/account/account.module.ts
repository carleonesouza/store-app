import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { StoreAppService } from '../services/store-app.service';

import { StoreAppMaterialModule } from '../store-app-material-module';
import { LoginComponent } from './login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        LoginComponent
    ],

    imports: [
        BrowserModule,
        StoreAppMaterialModule,
        FlexLayoutModule,
        BrowserModule,
        BrowserAnimationsModule,
        StoreAppMaterialModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        HttpClientModule
    ],

    providers: [ StoreAppService ]
})
export class AccountModule {
    static ROUTES: Routes = [
        { path: 'login', component: LoginComponent }
    ];
}
