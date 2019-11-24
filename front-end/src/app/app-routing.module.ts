import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FrontStoreComponent } from '../front-store/front-store.component';
import { HomeComponent } from '../home/home.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { CreateProductComponent } from '../create-product/create-product.component';
import { SignInComponent } from '../loggin/sign-in/sign-in.component';
import { SignUpComponent } from 'src/loggin/sign-up/sign-up.component';

export const APP_ROUTES: Routes = [
  {path: '', component: AppComponent, children: [
      { path: '', component: HomeComponent},
      { path: 'login', component: SignInComponent},
      { path: 'logup', component: SignUpComponent},
      { path: 'front-store', component: FrontStoreComponent },
      { path: 'create-product', component: CreateProductComponent },
      { path: '404', component: NotFoundComponent },
      { path: '**', redirectTo: '/404' }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
