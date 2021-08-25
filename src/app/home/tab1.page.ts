import { MatchDetailsComponent } from './../components/matchs/match-details/match-details.component';
import { AuthService } from './../services/auth.service';
import { Match } from './../models/match.model';
import { NavController, ModalController } from '@ionic/angular';
import { Component } from '@angular/core';
import { LeagueService } from '../services/league.service';
import { User } from '../models/user.model';

@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
	public allMatchs: Match[];
	private hiddenMatchs: Match[] = [];
	private modal: any;

	public connectedUser: User;

	constructor(
		private leagueServ: LeagueService,
		private navCtrl: NavController,
		private authServ: AuthService,
		private modalController: ModalController
	) {
		this.connectedUser = this.authServ.connectedUser;
	}

	ionViewWillEnter() {
		this.leagueServ.getAllMatchs().subscribe((data: Match[]) => {
			this.allMatchs = data;
			this.sortMatchs();
		});
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

	search(evt: any) {
		let value = evt.detail.value;
		console.log(value);
		console.log(this.hiddenMatchs);

		if (value == '') {
			for (const match of this.hiddenMatchs) {
				this.hiddenMatchs.splice(this.hiddenMatchs.indexOf(match), 1);
				this.allMatchs.push(match);
				this.sortMatchs();
			}
		} else {
			for (const match of this.allMatchs) {
				if (!match.name.toLowerCase().includes(value.toLowerCase())) {
					this.allMatchs.splice(this.allMatchs.indexOf(match), 1);
					this.hiddenMatchs.push(match);
				}
			}

			for (const match of this.hiddenMatchs) {
				if (match.name.toLowerCase().includes(value.toLowerCase())) {
					this.hiddenMatchs.splice(
						this.hiddenMatchs.indexOf(match),
						1
					);
					this.allMatchs.push(match);
					this.sortMatchs();
				}
			}
		}
	}
	private sortMatchs() {
		this.allMatchs = this.allMatchs.sort((a, b) => a.date - b.date);
	}
}
