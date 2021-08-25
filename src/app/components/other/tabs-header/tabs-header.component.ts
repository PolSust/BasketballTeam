import { AlertController, NavController } from '@ionic/angular';
import { User } from './../../../models/user.model';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-tabs-header',
	templateUrl: './tabs-header.component.html',
	styleUrls: ['./tabs-header.component.scss'],
})
export class TabsHeaderComponent implements OnInit {
	public connectedUser: User;

	@Input() pageTitle: string;

	constructor(
		private authServ: AuthService,
		private navCtrl: NavController,
		private alertController: AlertController
	) {
		this.connectedUser = this.authServ.connectedUser;
	}

	ngOnInit() {}

	async alertOnLogout() {
		const alert = await this.alertController.create({
			cssClass: 'my-custom-class',
			header: 'Attention!',
			message: 'Voulez-vous vraiment vous déconnecter?',
			buttons: [
				{
					text: 'Non',
					role: 'cancel',
					cssClass: 'secondary',
				},
				{
					text: 'Oui',
					handler: async () => {
						await this.authServ.logout();
						this.navCtrl.navigateRoot('login');
					},
				},
			],
		});
		alert.present();
	}
}
