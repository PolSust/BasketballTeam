import { User } from './../../../models/user.model';
import { MatchDetailsComponent } from './../../matchs/match-details/match-details.component';
import { LeagueService } from 'src/app/services/league.service';
import { Match } from '../../../models/match.model';
import { Component, Input, OnInit } from '@angular/core';
import { MatchsPage } from 'src/app/matchs/matchs.page';

@Component({
	selector: 'app-match-form',
	templateUrl: './match-form.component.html',
	styleUrls: ['./match-form.component.scss'],
})
export class MatchFormComponent implements OnInit {
	public cityData: any;

	@Input() match: Match;
	@Input() nonSelectedPlayers: User[];
	@Input() create: boolean;

	constructor(
		private matchPage: MatchsPage,
		private leagueServ: LeagueService,
		private matchDetails: MatchDetailsComponent
	) {}

	ngOnInit() {
		console.log(this.match);
		console.log(this.nonSelectedPlayers);
	}

	onSubmit() {
		this.create
			? this.matchPage.submitMatch()
			: this.matchDetails.submitMatch(this.match);
	}

	removePlayer(player: User) {
		this.create
			? this.matchPage.removePlayer(player)
			: this.match.players.splice(this.match.players.indexOf(player), 1);

		this.nonSelectedPlayers.push(player);
	}
	addPlayer(player: User) {
		this.create
			? this.matchPage.addPlayer(player)
			: this.nonSelectedPlayers.splice(
					this.nonSelectedPlayers.indexOf(player),
					1
			  );
		this.match.players.push(player);
	}

	searchCity(city: string) {
		this.leagueServ.cityAPI(city).subscribe((data) => {
			this.cityData = data;
			console.log(data);
		});
	}
	cityClick(city: string) {
		this.match.city = city;
		console.log(city);
	}
	onBlur() {
		setTimeout(() => {
			(
				document.querySelector('.listAutocomplete') as HTMLElement
			).style.display = 'none';
		}, 100);
	}
	onClick() {
		(
			document.querySelector('.listAutocomplete') as HTMLElement
		).style.display = 'block';
	}
}
