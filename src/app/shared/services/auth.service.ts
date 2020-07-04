import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../user';
import { Observable, throwError, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { AuthResponse } from '../authResponse';

@Injectable({providedIn: 'root'})
export class AuthService {
	public error$: Subject<string> = new Subject<string>();

   public get token(): string {
	   const expDate: Date = new Date(localStorage.getItem('token-exp'));
	   if (new Date() > expDate) {
		   this.logout();
		   return null;
	   }
		return localStorage.getItem('token');
	}
	constructor(private http: HttpClient) {
	}

	private setToken(response: AuthResponse | null): void {
		if (response) {
		const expDate: Date = new Date(new Date().getTime() + + response.expiresIn * 1000);
		localStorage.setItem('token', response.idToken);
		localStorage.setItem('token-exp', expDate.toString());
		} else {
			localStorage.clear();
		}

	}

	private handleError(error: HttpErrorResponse): Observable<Error> {
		const {message} = error.error.error;

		switch (message) {
			case 'INVALID_EMAIL':
				this.error$.next('Неверный email');
				break;
			case 'INVALID_PASSWORD':
				this.error$.next('Неверный пароль');
				break;
			case 'EMAIL_NOT_FOUND':
				this.error$.next('Такого email нет');
				break;
		}
		return throwError(error);
	}

	public login(user: User): Observable<any> {
		user.SecureToken = true;
		return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
		.pipe(
			tap(this.setToken),
			catchError(this.handleError.bind(this))
		);
	}

	public logout(): void {
		this.setToken(null);
	}

	public isAuthenticated(): boolean {
		return !!this.token;
	}
}
