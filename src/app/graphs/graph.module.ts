import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TasksGraphComponent } from './components/tasks-graph.components'
import { ChartComponent } from '../ui/components/chart/chart.components';

@NgModule({
	declarations: [
		TasksGraphComponent,
		ChartComponent
	],
	imports: [CommonModule,
		RouterModule.forChild([
			{path: '', component: TasksGraphComponent},
		])],
	exports: [RouterModule]
})

export class GraphModule {
}
