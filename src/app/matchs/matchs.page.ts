import { NavController, ModalController } from '@ionic/angular';
import { LeagueService } from '../services/league.service';
import { Match } from '../models/match.model';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { MatchDetailsComponent } from '../components/matchs/match-details/match-details.component';

@Component({
	selector: 'app-matchs',
	templateUrl: './matchs.page.html',
	styleUrls: ['./matchs.page.scss'],
})
export class MatchsPage implements OnInit {
	public match: Match = {
		id: '',
		name: '',
		date: '',
		city: '',
		players: [],
		location: {
			latitude: 0,
			longitude: 0,
		},
	};
	public nonSelectedPlayers = [];

	public allMatchs: Match[];
	private modal: any;

	constructor(
		private leagueServ: LeagueService,
		private navCtrl: NavController,
		private toastController: ToastController,
		private modalController: ModalController
	) {}

	ngOnInit() {}

	ionViewWillEnter() {
		this.leagueServ
			.getAllPlayers()
			.pipe(first())
			.subscribe((data) => {
				this.match.players = data;
			});

		this.leagueServ.getAllMatchs().subscribe((data: Match[]) => {
			this.allMatchs = data;
			this.allMatchs = this.allMatchs.sort((a, b) => a.date - b.date);
		});
	}

	submitMatch() {
		let date = this.match.date.split('T');
		let time = date[1].split('.');
		time = time[0].split(':');

		date = date[0].split('-');
		this.match.date = new Date(
			date[0],
			date[1] - 1,
			date[2],
			time[0],
			time[1]
		).getTime();

		console.log(this.match.date);

		this.leagueServ.cityAPI(this.match.city).subscribe((data) => {
			this.match.location.longitude = data[0].centre.coordinates[0];
			this.match.location.latitude = data[0].centre.coordinates[1];

			this.leagueServ.addMatch(this.match);
			this.presentToast();
		});
	}

	async presentToast() {
		const toast = await this.toastController.create({
			message: 'Le match a été ajouté à la liste!',
			duration: 2000,
		});
		toast.present();
	}

	removePlayer(player: any) {
		this.match.players.splice(this.match.players.indexOf(player), 1);
		this.nonSelectedPlayers.push(player);
	}
	addPlayer(player: any) {
		this.nonSelectedPlayers.splice(
			this.nonSelectedPlayers.indexOf(player),
			1
		);
		this.match.players.push(player);
	}

	async gotoMatchDetails(match: Match) {
		console.log(match);

		this.modal = await this.modalController.create({
			component: MatchDetailsComponent,
			componentProps: {
				match,
			},
		});
		return await this.modal.present();
	}
	exitModal() {
		this.modalController.dismiss();
	}
}
