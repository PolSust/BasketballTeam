import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserCreatePageRoutingModule } from './user-create-routing.module';

import { UserCreatePage } from './user-create.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ComponentsModule,
		UserCreatePageRoutingModule,
	],
	declarations: [UserCreatePage],
})
export class UserCreatePageModule {}
