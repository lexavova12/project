import { Component, OnInit } from '@angular/core';
import { Form, Validators, FormControl, FormGroup } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../model/task';
import { User } from 'src/app/users/model/userBD';
import { UserService } from 'src/app/users/services/user.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  public form: FormGroup;
  public perem: User[];
  constructor(private taskService: TaskService, private userService: UserService) { }

  public ngOnInit(): void {
	this.userService.getAll().subscribe(data => {
		this.perem = data;
	});

	this.form = new FormGroup({
		id: new FormControl(''),
		customer: new FormControl('', [Validators.minLength(3)]),
		name: new FormControl('', [Validators.minLength(3)]),
		phone: new FormControl('', [Validators.minLength(3)]),
  	adress: new FormControl('', [Validators.minLength(3)]),
  	executor: new FormControl('', [Validators.minLength(3)]),
	  dateStart: new FormControl(''),
	  isDone: new FormControl(''),
	});
  }
  public submit(): void {
  	let isDoneDate: Date;

	if (this.form.value.isDone) {
  	isDoneDate = new Date();
	}

	const task: Task = {
		id: this.form.value.id,
  	customer: this.form.value.customer,
  	executor: this.form.value.executor,
		name: this.form.value.name,
		phone: this.form.value.phone,
	  adress: this.form.value.adress,
	  isDone: this.form.value.isDone ,
	  dateStart: this.form.value.dateStart,
	  dateEnd: isDoneDate,
  };

  this.taskService.create(task);

  this.form.reset();

  }

}
