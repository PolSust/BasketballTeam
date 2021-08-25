import { AuthService } from './services/auth.service';
import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		return this.checkLogin(state.url);
	}
	constructor(private auth: AuthService, private navCtrl: NavController) {}

	async checkLogin(url: string): Promise<boolean> {
		if (this.auth.isLogged && (await this.auth.getUser()) != null)
			return true;
		else {
			this.navCtrl.navigateRoot(['/login']);
			return false;
		}
	}
}
