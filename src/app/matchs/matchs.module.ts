import { MatchDetailsComponent } from './../components/matchs/match-details/match-details.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatchsPageRoutingModule } from './matchs-routing.module';

import { MatchsPage } from './matchs.page';
import { ComponentsModule } from '../components/components.module';
import { CommonModule } from '@angular/common';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		MatchsPageRoutingModule,
		ComponentsModule,
	],
	declarations: [MatchsPage],
	providers: [MatchDetailsComponent],
})
export class MatchsPageModule {}
