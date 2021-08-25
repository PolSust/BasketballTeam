import { Tab1Page } from './../home/tab1.page';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { MatchDetailsComponent } from './matchs/match-details/match-details.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { UserFormComponent } from './forms/user-form/user-form.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { PlayerListPage } from '../admin/player-list/player-list.page';
import { UserCreatePage } from '../admin/user-create/user-create.page';
import { MatchsPage } from '../matchs/matchs.page';
import { LeagueService } from '../services/league.service';
import { MatchFormComponent } from './forms/match-form/match-form.component';
import { TabsHeaderComponent } from './other/tabs-header/tabs-header.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
	imports: [
		FormsModule,
		IonicModule,
		CommonModule,
		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyBr2XM7Q8HtzM_LRpvB-sVEP1ffaER4tS8',
		}),
	],
	declarations: [
		UserFormComponent,
		MatchFormComponent,
		TabsHeaderComponent,
		MatchDetailsComponent,
	],
	exports: [
		UserFormComponent,
		MatchFormComponent,
		TabsHeaderComponent,
		MatchDetailsComponent,
	],
	providers: [
		PlayerListPage,
		UserCreatePage,
		Tab1Page,
		MatchsPage,
		LeagueService,
		LaunchNavigator,
		MatchDetailsComponent,
	],
})
export class ComponentsModule {}
