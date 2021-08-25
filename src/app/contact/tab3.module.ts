import { ComponentsModule } from './../components/components.module';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';

import { Tab3PageRoutingModule } from './tab3-routing.module';
import { CallNumber } from '@ionic-native/call-number/ngx';

@NgModule({
	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
		RouterModule.forChild([{ path: '', component: Tab3Page }]),
		Tab3PageRoutingModule,
		ComponentsModule
	],
	declarations: [Tab3Page],
	providers: [CallNumber],
})
export class Tab3PageModule {}
