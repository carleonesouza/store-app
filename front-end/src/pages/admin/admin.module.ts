import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreAppMaterialModule } from '../../store-app-material-module';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
 

import { AddDialogComponent } from './add/add-dialog.component';
import { EditDialogComponent } from './edit/edit-dialog.component';
import { DeleteDialogComponent } from './delete/delete-dialog.component';

import { DashboardAdmComponent } from '../admin/dashboard-adm/dashboard-adm.component'
import { ManagementUsersComponent } from './view-user-adm/management-users.component';
import { ImagesComponent } from '../upload/images/images.component';
import { ManagementUsersViewEditComponent } from './view-user-adm/view-edit/management-users-view-edit.component';
import { CategoryComponent } from './category/category.component';
import { ListComponent } from './list/list.component';
import { ChoosingDirective } from 'src/app/choosing.directive';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: 'right',
    allowNegative: true,
    decimal: ',',
    precision: 2,
    prefix: 'R$ ',
    suffix: '',
    thousands: '.'
};

@NgModule({
    declarations: [
        AddDialogComponent,
        EditDialogComponent,
        DeleteDialogComponent,
        DashboardAdmComponent,
        ManagementUsersComponent,
        ManagementUsersViewEditComponent,
        ImagesComponent,
        CategoryComponent,
        ListComponent,
        ChoosingDirective
    ],

    imports: [
        BrowserModule,
        RouterModule,
        MatDialogModule,
        StoreAppMaterialModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxDropzoneModule,
        CurrencyMaskModule
    ],

    providers: [
       { provide: MatDialogRef, useValue: {}},
       { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }

    ],
    entryComponents: [
        AddDialogComponent,
        EditDialogComponent,
        ManagementUsersViewEditComponent,
        DeleteDialogComponent,
        DashboardAdmComponent,
        ImagesComponent
    ]
})
export class AdminModule {
    static ROUTES: Routes = [
        { path: 'dashboard-adm', component: DashboardAdmComponent},
        { path: 'list', component: ListComponent},
        { path: 'management-users', component: ManagementUsersComponent}
    ];
}
