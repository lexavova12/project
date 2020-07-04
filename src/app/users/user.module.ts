import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserLayoutComponent } from './shared/components/user-layout/user-layout.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { UserComponent } from './components/user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SearchUser } from './pipes/search.pipe';

@NgModule({
	declarations: [UserLayoutComponent,
		UserFormComponent,
		 EditUserComponent,
		 UserComponent,
		SearchUser],
	imports: [CommonModule,
		FormsModule,
		HttpClientModule,
		ReactiveFormsModule,
		RouterModule.forChild([
			{path: '', component: UserLayoutComponent, children: [{path: ':id/edit', component: EditUserComponent }]},
		])],
	exports: [RouterModule],
})

export class UserModule {

}
