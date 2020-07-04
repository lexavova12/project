import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../model/userBD';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  public form: FormGroup;

  constructor(private userService: UserService) {
	this.userService.userForEdit().subscribe(data => {
		if (data) {
		data.adress = '';
		this.form.setValue({

			id: data.id || '',
			name: data.name || '',
			surname: data.surname || '',
			phone: data.phone || '',
			userpic: data.userpic || '',
			position: {type: data.position || ''},
			address: {
			country: '' || '',
			city: '' || ''
			},

		});
		}
	});
  }

  public ngOnInit(): void {
	this.form = new FormGroup({
		id: new FormControl(''),
		name: new FormControl('', [Validators.minLength(3), Validators.required]),
		surname: new FormControl('', [Validators.minLength(3), Validators.required]),
		phone: new FormControl('', [Validators.minLength(3), Validators.required]),
		userpic: new FormControl(''),
		position: new FormGroup({
		type: new FormControl('')
		}),
		address: new FormGroup({
		country: new FormControl('mn'),
		city: new FormControl(''),
		})
	});
  }

  public submit(): void {
	const user: User = {
		id: this.form.value.id,
		name: this.form.value.name,
		surname: this.form.value.surname,
		position: this.form.value.position.type,
		adress: this.form.value.country,
		phone: this.form.value.phone,
		userpic: this.form.value.userpic
	};
	if (user.id) {
		this.userService.update(user);
	} else {
		this.userService.create(user);
	}
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
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = function () {
			const base64data = reader.result;
			that.form.controls.userpic.setValue(base64data);
			};
		}, 'image/jpeg', 1);
		document.getElementById('file').insertAdjacentElement('beforebegin', elem);
		};
	};
  }
}
