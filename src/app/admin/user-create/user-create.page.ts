import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LeagueService } from '../../services/league.service';

@Component({
	selector: 'app-user-create',
	templateUrl: './user-create.page.html',
	styleUrls: ['./user-create.page.scss'],
})
export class UserCreatePage implements OnInit {
	public user: User = {
		uid: '',
		email: '',
		password: '',
		role: '',
		name: '',
	};

	public teams: any[];
	public name: string;

	constructor(
		private authServ: AuthService,
		private toaster: ToastController,
		private league: LeagueService
	) {}

	ngOnInit() {}

	onSubmit() {

		this.authServ
			.createAccount(this.user)
			.then(() => {
				this.presentToastWithOptions('Compte créé avec succès!', false);
			})
			.catch((err) => {
				this.presentToastWithOptions(err, true);
			});
	}

	private async presentToastWithOptions(msg: string, error: boolean) {
		let color = error ? 'danger' : 'success';

		const toast = await this.toaster.create({
			message: msg,
			position: 'bottom',
			color,
		});
		await toast.present();
	}
}
