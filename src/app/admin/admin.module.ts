import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../shared/services/auth.guard';

@NgModule({
	declarations: [AdminLayoutComponent, DashboardPageComponent, LoginPageComponent],
	imports: [
		CommonModule,
		FormsModule,
		SharedModule,
		ReactiveFormsModule,
		RouterModule.forChild([
			{path: '', component: AdminLayoutComponent, children: [
				{path: '', redirectTo: '/admin/login', pathMatch: 'full'},
				{path: 'login', component: LoginPageComponent},
				{path: 'dashboard', component: DashboardPageComponent , canActivate: [AuthGuard]},
				{path: 'user', loadChildren: () => import('../users/user.module').then(module => module.UserModule), canActivate: [AuthGuard]},
				{path: 'task', loadChildren: () => import('../tasks/task.module').then(module => module.TaskModule), canActivate: [AuthGuard]},
				{path: 'graph', loadChildren: () => import('../graphs/graph.module').then(module => module.GraphModule), canActivate: [AuthGuard]},
			]
		}
		])
	],
	exports: [RouterModule]
})

export class AdminModule {

}
