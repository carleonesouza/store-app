import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreAppMaterialModule } from '../../store-app-material-module';

import { AddDialogComponent } from './add/add-dialog.component';
import { EditDialogComponent } from './edit/edit-dialog.component';
import { DeleteDialogComponent } from './delete/delete-dialog.component';

import { CreateProductComponent } from './create-product/create-product.component';
import { ManagementUsersComponent } from './view-user-adm/management-users.component';
import { ManagementUsersViewEditComponent } from './view-user-adm/view-edit/management-users-view-edit.component';



@NgModule({
    declarations: [
        AddDialogComponent,
        EditDialogComponent,
        DeleteDialogComponent,
        CreateProductComponent,
        ManagementUsersComponent,
        ManagementUsersViewEditComponent
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
        AddDialogComponent,
        EditDialogComponent,
        ManagementUsersViewEditComponent,
        DeleteDialogComponent,
        CreateProductComponent,
    ]
})
export class AdminModule {
    static ROUTES: Routes = [
        { path: 'product', component: CreateProductComponent},
        { path: 'management-users', component: ManagementUsersComponent}
    ];
}
