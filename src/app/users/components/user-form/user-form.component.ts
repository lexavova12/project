import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../model/userBD';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  public form: FormGroup;

  constructor(private userService: UserService) {
  }

  public ngOnInit(): void {
	this.form = new FormGroup({
		id: new FormControl(''),
		name: new FormControl('', [Validators.minLength(3), Validators.required, Validators.pattern('^[А-Яа-яЁё]+$')]),
		surname: new FormControl('', [Validators.minLength(3), Validators.required, Validators.pattern('^[А-Яа-яЁё]+$')]),
		phone: new FormControl('', [Validators.minLength(3), Validators.required, Validators.pattern('^[А-Яа-яЁё]+$')]),
		userpic: new FormControl(''),
		position: new FormGroup({
		type: new FormControl('Администратор')
		}),
		address: new FormGroup({
		country: new FormControl('mg'),
		city: new FormControl(''),
		})
	});
  }

  public submit(): void {
	const data: any = {...this.form.value};
	for (const iterator in data) {
		if (iterator === 'name') {
		confirm(`Пользователь ${data[iterator]} успешно зарегестрирован`);
		}
	}

	const user: User = {
		id: this.form.value.id,
		name: this.form.value.name,
		surname: this.form.value.surname,
		position: this.form.value.position.type,
		adress: this.form.value.country,
		phone: this.form.value.phone,
		userpic: this.form.value.userpic
	};

	this.userService.create(user);

	this.form.reset();
	document.getElementById('file').nodeValue = '';
	document.getElementById('thumb').remove();
  }

  public compress(data) {
	const that = this;
	const width = 100;
	const height = 100;
	const fileName = data.target.files[0].name;
	const reader = new FileReader();
	reader.readAsDataURL(data.target.files[0]);
	reader.onload = event => {
		const img = new Image();
		if (typeof event.target.result === 'string') {
		img.src = event.target.result;
		}
		img.onload = () => {
		const elem = document.createElement('canvas');
		elem.id = 'thumb';
		elem.width = width;
		elem.height = height;
		const ctx = elem.getContext('2d');
		ctx.drawImage(img, 0, 0, width, height);
		ctx.canvas.toBlob((blob) => {
			const file = new File([blob], fileName, {
			type: 'image/jpeg',
			lastModified: Date.now()
			});
			let reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = function () {
			let base64data = reader.result;
			that.form.controls.userpic.setValue(base64data);
			};
		}, 'image/jpeg', 1);
		document.getElementById('file').insertAdjacentElement('beforebegin', elem);
		};
	};
  }
}
