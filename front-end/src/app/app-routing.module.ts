import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountModule } from '../account/account.module';
import { AdminModule } from '../pages/admin/admin.module';
import { VendorModule } from '../pages/vendor/vendor.module';

import { BaseComponent } from './base.component';
import { AuthGuard } from '../guards/auth.guard';
import { LoggedInGuard } from '../guards/logged-in.guard';
import { HomeComponent } from 'src/pages/home/home.component';
import { FrontStoreComponent } from 'src/pages/front-store/front-store.component';
import { NotFoundComponent } from 'src/pages/not-found/not-found.component';


export const AppRoutes: Routes = [
    { path: '', component: BaseComponent },
    { path: 'account', children: AccountModule.ROUTES },
    { path: 'home', component: HomeComponent, canActivate: [LoggedInGuard] },
    { path: 'front-store', component: FrontStoreComponent, canActivate: [LoggedInGuard] },
    { path: 'admin', children: AdminModule.ROUTES, canActivate: [AuthGuard], data: { role: 'admin' } },
    { path: 'vendor', children: VendorModule.ROUTES, canActivate: [AuthGuard], data: { role: 'vendor' } },
    { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }

];
@NgModule({
  imports: [RouterModule.forRoot(AppRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
