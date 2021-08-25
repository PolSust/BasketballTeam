import { PlayerListPage } from '../../../admin/player-list/player-list.page';
import { User } from '../../../models/user.model';
import { Component, Input, OnInit, ViewChildren } from '@angular/core';
import { UserCreatePage } from '../../../admin/user-create/user-create.page';

@Component({
	selector: 'app-user-form',
	templateUrl: './user-form.component.html',
	styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
	@Input() onlyUser: boolean;
	@Input() user: User;
	@Input() create: boolean;

	constructor(
		private userUpdate: PlayerListPage,
		private userCreate: UserCreatePage
	) {}

	ngOnInit() {}

	onSubmit(user: User) {
		if (this.create) this.userCreate.onSubmit();
		else {
			this.userUpdate.updatePlayer(user);
		}
	}
	onCancel() {
		this.userUpdate.onCancel();
	}
}
