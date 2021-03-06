import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/shared/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  private minLengthPasa: number = 6;
  public form: FormGroup;

  constructor(private authService: AuthService,
  private router: Router) { }

  public get auth(): AuthService {
	return this.authService;
}

  public ngOnInit(): void {
  	this.form = new FormGroup({
  	  email: new FormControl(null, [Validators.required, Validators.email]),
		password: new FormControl(null, [Validators.required, Validators.minLength(this.minLengthPasa)]),
  });
  }

  public submit(): void {
	if (this.form.invalid) {
		return;
  }
  const user: User = {
  email: this.form.value.email,
  password: this.form.value.password
  };
  this.authService.login(user).subscribe((param: any) => {
	console.log(param);
	this.form.reset();
	this.router.navigate(['/admin', 'dashboard']);
  });
  }
}
