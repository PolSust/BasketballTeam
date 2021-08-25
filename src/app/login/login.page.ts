import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	public username: string;
	public password: string;

	constructor(private auth: AuthService, private navCtrl: NavController) {}

	ngOnInit() {}

	checkLogin() {
		this.auth.login(this.username, this.password).then(() => {
			this.navCtrl.navigateRoot('tabs/tab1');
		});
	}
}
