import { User } from './../models/user.model';
import { LeagueService } from './league.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	public isLogged = false;
	public connectedUser: User;

	constructor(
		private firestore: AngularFirestore,
		private afAuth: AngularFireAuth,
		private leagueServ: LeagueService
	) {
		this.isLogged = sessionStorage.getItem('user') !== null;
	}

	private storeOnSession(user: User) {
		user.password = '';
		sessionStorage.setItem('user', JSON.stringify(user));
	}
	async logout() {
		return this.afAuth.signOut().then(() => {
			this.isLogged = false;
			sessionStorage.removeItem('user');
		});
	}

	getUser(): Promise<User> {
		return new Promise((resolve, reject) => {
			if (this.isLogged) {
				let acc: string = sessionStorage.getItem('user');
				this.connectedUser = JSON.parse(acc);
				resolve(this.connectedUser);
			}
		});
	}

	login(username: string, password: string) {
		return new Promise((resolve, reject) => {
			this.afAuth
				.signInWithEmailAndPassword(username, password)
				.then((data) => {
					this.firestore
						.collection('users')
						.doc(data.user.uid)
						.get()
						.subscribe((doc) => {
							resolve(true);
							this.isLogged = true;
							let user: any = doc.data();
							this.storeOnSession(user);
						});
				})
				.catch((error) => {
					reject(error);
					this.isLogged = false;
					return error;
				});
		});
	}

	createAccount(user: User) {
		return this.afAuth
			.createUserWithEmailAndPassword(user.email, user.password)
			.then((data) => {
				this.addRoles(user.role, data.user.uid);

				this.leagueServ.addPlayer(user, data.user.uid);
			});
	}
	updateAccount(newUser: User, oldUser: User) {
		console.log(newUser);

		return this.afAuth
			.signInWithEmailAndPassword(oldUser.email, oldUser.password)
			.then((data) => {
				data.user.updateEmail(newUser.email);
				data.user.updatePassword(newUser.password);

				this.leagueServ.updatePlayer(newUser);
			});
	}

	private addRoles(role: string, uid: string) {
		this.firestore.collection('users').doc(uid).set({ role: role });
	}
}
