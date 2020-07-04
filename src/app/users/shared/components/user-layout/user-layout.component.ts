import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/users/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/users/model/userBD';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent implements OnInit {

  public visableUser: boolean = true;
  public users: User[] = [];
  public search: string = '';
  constructor(private usersService: UserService,
	private router: Router) {
  }

  public ngOnInit(): void {
	this.getUsers();
  }

  public getUsers() {
	return this.usersService.getAll().subscribe(data => {
	this.users = data;
  });
  }

  public edit(id: string): void {
	/*this.usersService.loadUserForEdit(id);*/
  }
  public remove(id: string): void {
	this.usersService.remove(id);
  }

  public showEdit(id): void {
  this.visableUser = false;
  this.usersService.loadUserForEdit(id);
  }

  public addUser(event: Event): void {
	event.preventDefault();
  if (!this.visableUser) {
		this.visableUser = !this.visableUser;
  }
	this.router.navigate(['/admin', 'user']);
  }

}
