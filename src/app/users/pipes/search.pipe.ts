import { PipeTransform, Pipe } from '@angular/core';
import { User } from '../model/userBD';

@Pipe({
	name: 'searchUser'
})
export class SearchUser implements PipeTransform {
	public transform(_users: User[], _search: string = ''): User[] {
		if (!_search.trim()) {
			return _users;
		}
		return _users.filter((user: User) => {
			return user.surname.toLowerCase().includes(_search.toLowerCase());
		});
	}

}
