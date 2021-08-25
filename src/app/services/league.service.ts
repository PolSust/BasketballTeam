import { Match } from './../models/match.model';
import { User } from './../models/user.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class LeagueService {
	private currentMatch: Match;
	constructor(
		private firestore: AngularFirestore,
		private http: HttpClient
	) {}

	addPlayer(user: User, uid: string) {
		this.firestore.collection('users').doc(uid).update({
			uid,
			name: user.name,
			email: user.email,
			password: user.password,
		});
	}
	updatePlayer(newUser: User) {
		console.log(newUser);

		this.firestore.collection('users').doc(newUser.uid).update({
			name: newUser.name,
			email: newUser.email,
			password: newUser.password,
			role: newUser.role,
		});
	}

	getPlayerByUid(uid: string): Observable<any> {
		return this.firestore.collection('users').doc(uid).valueChanges();
	}

	getAllPlayers(): Observable<any> {
		return this.firestore.collection('users').valueChanges();
	}

	addMatch(match: Match) {
		match.id = this.firestore.createId();
		this.firestore.collection('matchs').doc(match.id).set({
			id: match.id,
			name: match.name,
			city: match.city,
			date: match.date,
			players: match.players,
			location: match.location,
		});
	}
	updateMatch(match: Match) {
		console.log(match.id);

		return this.firestore.collection('matchs').doc(match.id).update({
			name: match.name,
			city: match.city,
			date: match.date,
			location: match.location,
		});
	}
	deleteMatch(match: Match) {
		return this.firestore.collection('matchs').doc(match.id).delete();
	}

	getAllMatchs() {
		return this.firestore.collection('matchs').valueChanges();
	}

	getCurrentMatch() {
		return this.currentMatch;
	}
	setCurrentMatch(match: Match) {
		this.currentMatch = match;
	}

	cityAPI(city: string) {
		const api = 'https://geo.api.gouv.fr/communes?nom=';
		let req = `${api}${city}&fields=centre&limit=5`;
		return this.http.get(req);
	}
}
