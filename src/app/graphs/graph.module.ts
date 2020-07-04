import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TasksGraphComponent } from './components/tasks-graph.components'
import { ChartComponent } from '../ui/components/chart/chart.components';
import { FormsModule } from '@angular/forms';
import { DropDownComponent } from '../ui/components/dropdown/dropdown.components';

@NgModule({
	declarations: [
		TasksGraphComponent,
		ChartComponent,
		DropDownComponent
	],
	imports: [CommonModule,
		FormsModule,
		RouterModule.forChild([
			{path: '', component: TasksGraphComponent},
		])],
	exports: [RouterModule]
})

export class GraphModule {
}
