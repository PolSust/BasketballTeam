import { ContactService } from './../services/contact.service';
import { Contact } from './../models/contact.model';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-tab3',
	templateUrl: 'tab3.page.html',
	styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
	public contact: Contact = {
		phoneNumber: '',
		email: '',
		adress: '',
	};
	public connectedUser: User;


	ionViewWillEnter() {
		this.contactServ.getContact().subscribe((contact: Contact) => {
			this.contact = contact;
		});
	}

	constructor(
		private alertController: AlertController,
		private callNumber: CallNumber,
		private contactServ: ContactService,
		private authServ: AuthService,
	) {
		this.connectedUser = this.authServ.connectedUser
	}
	callContact() {
		this.callNumber.callNumber(
			this.contact.phoneNumber,
			false
		);
	}

	setContactDetails() {
		this.contactServ.setContact(this.contact);
	}

	async modifierContact() {
		const alert = await this.alertController.create({
			cssClass: 'my-custom-class',
			header: 'Mod. des coordonnées',
			message: 'Adresse, Télephone et email',
			inputs: [
				{
					name: 'adress',
					type: 'text',
					placeholder: 'Adresse',
					value: this.contact.adress,
				},
				{
					name: 'phoneNumber',
					type: 'text',
					placeholder: 'Téléphone',
					value: this.contact.phoneNumber,
				},
				{
					name: 'email',
					type: 'text',
					placeholder: 'Email',
					value: this.contact.email,
				},
			],
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					cssClass: 'secondary',
					handler: () => {
						console.log('Confirm Cancel');
					},
				},
				{
					text: 'Ok',
					handler: (data) => {
						this.contact = data;

						this.setContactDetails();
					},
				},
			],
		});

		await alert.present();
	}
}
