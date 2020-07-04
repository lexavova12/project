import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './admin/login-page/login-page.component';

const routes: Routes = [
  {path: '', component: LoginPageComponent },
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
