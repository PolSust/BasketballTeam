import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayerListPageRoutingModule } from './player-list-routing.module';

import { PlayerListPage } from './player-list.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ComponentsModule,
		PlayerListPageRoutingModule,
	],
	declarations: [PlayerListPage],
})
export class PlayerListPageModule {}
