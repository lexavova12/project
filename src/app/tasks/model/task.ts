import { User } from 'src/app/users/model/userBD';

export class Task {
	public id?: string;
	public customer: string;
	public executor: User;
	public name: string;
	public adress: string;
	public phone: string;
	public isDone: boolean;
	public dateStart: Date;
	public dateEnd: Date;

	constructor(id: string, customer: string, executor: User, name: string, adress: string, phone: string, isDone: boolean= false,
		dateStart: Date, dateEnd: Date) {
		this.id = id;
		this.customer = customer;
		this.executor = executor;
		this.name = name;
		this.adress = adress;
		this.phone = phone;
		this.isDone = isDone;
		this.dateEnd = dateEnd;
		this.dateStart = dateStart;
	 }
}
