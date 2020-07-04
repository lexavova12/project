import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import { User } from '../model/userBD';

@Injectable({providedIn: 'root'})
export class UserService {
  private users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {
	this.reload();
  }

  private reload(): any {
	return this.http.get('https://angular-project-62344.firebaseio.com/users.json')
		.pipe(map((response: { [key: string]: any }) => {
		return Object
			.keys(response)
			.map(key => ({
			...response[key],
			id: key,
			name: response[key].name,
			}));
		})).subscribe(users => {
		this.users$.next(users);
		});
  }

  public create(user: User): Subscription {
	return this.http.post<User>('https://angular-project-62344.firebaseio.com/users.json', user).subscribe(() => {
		this.reload();
	});
  }
  public update(user: User) {
	return this.http.put<User>(`https://angular-project-62344.firebaseio.com/users/${user.id}.json`, user).subscribe(() => {
		this.reload();
	});
  }
  public userForEdit() {
	return this.currentUser$.asObservable();
  }

  public getAll(): Observable<User[]> {
	return this.users$.asObservable();
  }

  public getById(id: string): Observable<User> {
	return this.http.get<User>(`https://angular-project-62344.firebaseio.com/users/${id}.json`)
		.pipe(map((user: User) => {
		return {
			...user, id,
		};
		}));
  }

  public remove(id: string): Subscription {
	return this.http.delete<void>(`https://angular-project-62344.firebaseio.com/users/${id}.json`).subscribe(
		() => {
		this.reload();
		}
	);
  }

  public loadUserForEdit(id: string): void {
	this.getById(id).subscribe(data => {
		this.currentUser$.next(data); });
  }

}
