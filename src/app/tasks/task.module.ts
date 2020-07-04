import { NgModule } from '@angular/core';
import { TaskLayoutComponent } from './shared/components/task-layout/task-layout.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { MapComponent } from './components/map/map.component';
import {AgmCoreModule} from '@agm/core';

@NgModule({
	declarations: [TaskLayoutComponent,
	EditTaskComponent,
	TaskFormComponent,
	MapComponent,
],
  imports: [CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', component: TaskLayoutComponent, children: [{path: ':id/edit', component: EditTaskComponent}]},
    ]), AgmCoreModule],
	exports: [RouterModule],

})

export class TaskModule {
}
