import { Component, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import {Task} from '../../model/task';
import {User} from '../../../users/model/userBD';
import {UserService} from '../../../users/services/user.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent {

@Input() public task: any;
@Output() public onUpDate = new EventEmitter<Task>();

  public form: FormGroup;
  public perem: User[];

  constructor(private taskService: TaskService, private userService: UserService) {
  }

  public ngOnChanges(): void {
	this.userService.getAll().subscribe(data => {
		this.perem = data;
	});

	this.task = JSON.parse(this.task);

	this.form = new FormGroup({
	id: new FormControl(''),
	customer: new FormControl('', [Validators.minLength(3)]),
	name: new FormControl('', [Validators.minLength(3)]),
	phone: new FormControl('', [Validators.minLength(3)]),
	adress: new FormControl('', [Validators.minLength(3)]),
	executor: new FormControl('', [Validators.minLength(3)]),
	dateStart: new FormControl(''),
	dateEnd: new FormControl(''),
	isDone: new FormControl(''),
		});

	this.form.setValue({
		id: this.task.id || '',
		customer: this.task.customer || '',
		executor: this.task.executor || '',
	  adress: this.task.adress || '',
		name: this.task.name || '',
		phone: this.task.phone || '',
		isDone: this.task.isDone || '',
		dateStart: this.task.dateStart || '',
		dateEnd: this.task.dateEnd || ''
	});

  }

  public submit(): void {
	const updatedTask: Task = {
		id: this.form.value.id,
		customer: this.form.value.customer,
		executor: this.form.value.executor,
		name: this.form.value.name,
		phone: this.form.value.phone,
		adress: this.form.value.adress,
		isDone: this.form.value.isDone,
		dateStart: this.form.value.dateStart,
		dateEnd: this.form.value.dateEnd,
	}
	this.onUpDate.emit(updatedTask);
		this.taskService.update(updatedTask);

	this.form.reset();
  }

}
