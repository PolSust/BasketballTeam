import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { User } from '../models/user.model';

@Component({
	selector: 'app-tabs',
	templateUrl: 'tabs.page.html',
	styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
	public connectedUser: User;
	public pageName: string;

	constructor(private authServ: AuthService) {
		this.connectedUser = this.authServ.connectedUser;
	}

	ngOnInit() {}
}
