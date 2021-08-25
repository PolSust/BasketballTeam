import { NavController } from '@ionic/angular';
import { Component } from '@angular/core';

@Component({
	selector: 'app-tab2',
	templateUrl: 'tab2.page.html',
	styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
	constructor(private navCtrl: NavController) {}

	gotoUserCreate() {
		this.navCtrl.navigateForward('user-create');
	}

	gotoPlayersList() {
		this.navCtrl.navigateForward('player-list');
	}

	gotoTeamsList() {
		this.navCtrl.navigateForward('matchs');
	}
}
