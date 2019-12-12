import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { SignInComponent } from '../loggin/sign-in/sign-in.component';
import { DashboardAppModule } from 'src/dashboard/dashboard.module';
import { BaseComponent } from './base.component';
import { AuthGuard } from '../guards/auth.guard';

export const AppRoutes: Routes = [
  { path: 'login', component: SignInComponent},
  { path: 'dashboard', children: DashboardAppModule.UserRoutes, canActivate: [AuthGuard]},
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
