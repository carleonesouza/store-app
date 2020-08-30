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

import { CreateProductComponent } from './create-product/create-product.component';
import { ManagementUsersComponent } from './view-user-adm/management-users.component';
import { ImagesComponent } from '../upload/images/images.component';
import { ManagementUsersViewEditComponent } from './view-user-adm/view-edit/management-users-view-edit.component';
import { CategoryComponent } from './category/category.component';

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
        CreateProductComponent,
        ManagementUsersComponent,
        ManagementUsersViewEditComponent,
        ImagesComponent,
        CategoryComponent,
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
        CreateProductComponent,
        ImagesComponent
    ]
})
export class AdminModule {
    static ROUTES: Routes = [
        { path: 'product', component: CreateProductComponent},
        { path: 'management-users', component: ManagementUsersComponent}
    ];
}
