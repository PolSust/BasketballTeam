import { Tab1Page } from './../../../home/tab1.page';
import { MatchsPage } from 'src/app/matchs/matchs.page';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import {
	NavController,
	ModalController,
	AlertController,
	ToastController,
} from '@ionic/angular';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { Match } from 'src/app/models/match.model';
import { User } from 'src/app/models/user.model';
import { LeagueService } from 'src/app/services/league.service';
import { MatchFormComponent } from '../../forms/match-form/match-form.component';

@Component({
	selector: 'app-match-details',
	templateUrl: './match-details.component.html',
	styleUrls: ['./match-details.component.scss'],
})
export class MatchDetailsComponent implements OnInit {
	@Input() match: Match;
	public nonSelectedPlayers: User[] = [];

	public connectedUser: User;

	constructor(
		private leagueServ: LeagueService,
		private authServ: AuthService,
		private navCtrl: NavController,
		private modalController: ModalController,
		private alertController: AlertController,
		private toastController: ToastController,
		private launchNavigator: LaunchNavigator,
		private matchsPage: MatchsPage,
		private tab1: Tab1Page
	) {
		this.connectedUser = this.authServ.connectedUser;
	}

	ngOnInit() {
		this.leagueServ.getAllPlayers().subscribe((players) => {
			for (const player of players) {
				if (
					this.match.players.find((p) => p.uid === player.uid) ===
					undefined
				) {
					this.nonSelectedPlayers.push(player);
				}
			}
		});
	}
	openMaps(location: any) {
		this.launchNavigator.navigate([location.latitude, location.longitude]);
	}

	async updateMatch() {
		const modal = await this.modalController.create({
			component: MatchFormComponent,
			cssClass: 'modalClass',
			swipeToClose: true,
			showBackdrop: true,
			componentProps: {
				match: this.match,
				create: false,
				nonSelectedPlayers: this.nonSelectedPlayers,
			},
		});
		return await modal.present();
	}
	submitMatch(match: Match) {
		this.leagueServ.cityAPI(match.city).subscribe(async (data) => {
			match.location.longitude = data[0].centre.coordinates[0];
			match.location.latitude = data[0].centre.coordinates[1];

			await this.leagueServ.updateMatch(match);
			this.toastMessage('La match a été mise a jour');
		});
	}

	async alertOnDelete() {
		const alert = await this.alertController.create({
			cssClass: 'my-custom-class',
			header: 'Alert',
			subHeader: 'Subtitle',
			message: 'Voulez-vous vraiment supprimer le match?',
			buttons: [
				{
					text: 'Oui',
					handler: () => {
						this.deleteMatch();
						this.toastMessage('Le match a été supprimé!');
					},
				},
				{
					text: 'Non',
					role: 'cancel',
					cssClass: 'secondary',
					handler: () => {
						console.log('Confirm Cancel');
					},
				},
			],
		});

		await alert.present();
	}

	async toastMessage(msg: string) {
		const toast = await this.toastController.create({
			message: msg,
			duration: 2000,
		});
		toast.present();
	}

	deleteMatch() {
		this.leagueServ.deleteMatch(this.match).then(() => {
			this.navCtrl.pop();
		});
	}

	addPlayer(player: any) {
		console.log(this.match);
	}
	removePlayer(player: any) {
		console.log(player);
	}
	exitModal() {
		this.matchsPage.exitModal();
		this.tab1.exitModal();
	}
}
