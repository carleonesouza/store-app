import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { SignInComponent } from '../loggin/sign-in/sign-in.component';
import { SignUpComponent } from '../loggin/sign-up/sign-up.component';
import { DashboardAppModule } from 'src/dashboard/dashboard.module';
import { ProductAppModule } from 'src/product-app/product-app.module';
import { BaseComponent } from './base.component';

export const APP_ROUTES: Routes = [
      {path: '', component: BaseComponent},
      { path: 'login', component: SignInComponent},
      { path: 'logup', component: SignUpComponent},
      { path: 'dashboard', children: DashboardAppModule.UserRoutes},
      { path: 'products', children: ProductAppModule.ProductRoutes},
      { path: '404', component: NotFoundComponent },
      { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
