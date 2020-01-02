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
import { ViewUserAdmComponent } from './view-user-adm/view/view-user-adm.component';
import { EditUserDialogComponent } from './view-user-adm/edit/edit-user-dialog.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ConfirmationDialogComponent } from '../dialogs/confirmation/confirmation-dialog.component';

@NgModule({
    declarations: [
        AddDialogComponent,
        EditDialogComponent,
        DeleteDialogComponent,
        ViewUserAdmComponent,
        CreateProductComponent,
        EditUserDialogComponent,
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
        DeleteDialogComponent,
        EditUserDialogComponent,
        CreateProductComponent,
    ]
})
export class AdminModule {
    static ROUTES: Routes = [
        { path: 'product', component: CreateProductComponent},
        { path: 'management-users', component: ViewUserAdmComponent}
    ];
}
