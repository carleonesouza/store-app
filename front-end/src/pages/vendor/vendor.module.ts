import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreAppMaterialModule } from '../../store-app-material-module';

import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
    declarations: [
       UserProfileComponent
    ],

    imports: [
        BrowserModule,
        RouterModule,
        StoreAppMaterialModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],

    providers: [

    ],

    entryComponents: [
        UserProfileComponent
    ]
})
export class VendorModule {
    static ROUTES: Routes = [
        { path: 'user-profile', component: UserProfileComponent }
    ];
}
