import { Contact } from './../models/contact.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class ContactService {
	constructor(private firestore: AngularFirestore) {}

	setContact(contact: Contact) {
		console.log(contact);

		return this.firestore.collection('contact').doc('contact1').set({
			phoneNumber: contact.phoneNumber,
			email: contact.email,
			adress: contact.adress,
		});
	}
	getContact() {
		return this.firestore
			.collection('contact')
			.doc('contact1')
			.valueChanges();
	}
}
