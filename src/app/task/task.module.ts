import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskLayoutComponent } from './shared/components/task-layout/task-layout.component';

@NgModule({
	declarations: [TaskLayoutComponent],
	imports: [CommonModule,
		RouterModule.forChild([
			{path: '', component: TaskLayoutComponent},
		])],
	exports: [RouterModule]
})

export class TaskModule {
}
