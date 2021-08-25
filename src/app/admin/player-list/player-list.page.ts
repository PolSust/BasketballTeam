import { User } from '../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { LeagueService } from '../../services/league.service';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { UserFormComponent } from '../../components/forms/user-form/user-form.component';
import { take } from 'rxjs/operators';

@Component({
	selector: 'app-player-list',
	templateUrl: './player-list.page.html',
	styleUrls: ['./player-list.page.scss'],
})
export class PlayerListPage implements OnInit {
	public users: User[] = [];
	private oldUser: User;
	private modal: any;

	constructor(
		private leagueserv: LeagueService,
		private modalController: ModalController,
		private authServ: AuthService
	) {}

	ngOnInit() {
		this.leagueserv.getAllPlayers().subscribe((users) => {
			this.users = users;
		});
	}

	ionViewWillEnter() {}

	updatePlayer(user: User) {
		this.leagueserv
			.getPlayerByUid(user.uid)
			.pipe(take(1))
			.subscribe(async (oldUser) => {
				await this.authServ.updateAccount(user, oldUser);
				this.modalController.dismiss();
			});
	}
	async presentModal(user: User) {
		this.modal = await this.modalController.create({
			component: UserFormComponent,
			cssClass: 'modalClass',
			swipeToClose: true,
			showBackdrop: true,
			componentProps: {
				user: user,
				create: false,
			},
		});
		return await this.modal.present();
	}
	onCancel() {
		this.modalController.dismiss();
	}
}
