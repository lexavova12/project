import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subscription, Observable, BehaviorSubject} from 'rxjs';
import {Task} from '../model/task';
import {map} from 'rxjs/operators';
import {subscriptionLogsToBeFn} from 'rxjs/internal/testing/TestScheduler';

@Injectable({providedIn: 'root'})
export class TaskService {
  private tasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  private currentTask$: BehaviorSubject<Task> = new BehaviorSubject<Task>(null);

  constructor(private http: HttpClient) {
	this.reload();
  }

  private reload(): any {
	return this.http.get('https://angular-project-62344.firebaseio.com/tasks.json')
		.pipe(map((response: { [key: string]: any }) => {
		return Object
			.keys(response)
			.map(key => ({
			...response[key],
			id: key,
			name: response[key].name,
			}));
		})).subscribe(tasks => {
		this.tasks$.next(tasks);
		});
  }

  public create(task: Task): Subscription {
	return this.http.post<Task>('https://angular-project-62344.firebaseio.com/tasks.json', task).subscribe(() => {
		this.reload();
	});
  }

  public update(task: Task) {
		return this.http.put<Task>(`https://angular-project-62344.firebaseio.com/tasks/${task.id}.json`, task).subscribe(() => {
		this.reload();
		});
  }

  public taskForEdit() {
	return this.currentTask$.asObservable();
  }

  public getAll(): Observable<Task[]> {
	return this.http.get('https://angular-project-62344.firebaseio.com/tasks.json')
		.pipe(map((response: { [key: string]: any }) => {
			return Object
			.keys(response)
			.map(key => ({
				...response[key],
				id: key,
			}));

		})
		);
  }

  public getById(id: string): Observable<Task>{
	return this.http.get<Task>(`https://angular-project-62344.firebaseio.com/tasks/${id}.json`)
    .pipe(map((task: any) => {
		return {
			...task, id
		};
		}));
  }

  public remove(id: string): Subscription {
	return this.http.delete<void>(`https://angular-project-62344.firebaseio.com/tasks/${id}.json`).subscribe(
		() => {
		this.reload();
		}
	);
  }

  public loadTaskForEdit(id: string): void {
	this.getById(id).subscribe(data => {
	  console.log(data);
		this.currentTask$.next(data); });
  }

}
