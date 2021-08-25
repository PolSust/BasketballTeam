import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
	{
		path: 'login',
		loadChildren: () =>
			import('./login/login.module').then((m) => m.LoginPageModule),
	},
	{
		path: '',
		loadChildren: () =>
			import('./tabs/tabs.module').then((m) => m.TabsPageModule),
		canActivate: [AuthGuard],
	},
	{
		path: 'user-create',
		loadChildren: () =>
			import('./admin/user-create/user-create.module').then(
				(m) => m.UserCreatePageModule
			),
		canActivate: [AuthGuard],
	},
	{
		path: 'player-list',
		loadChildren: () =>
			import('./admin/player-list/player-list.module').then(
				(m) => m.PlayerListPageModule
			),
		canActivate: [AuthGuard],
	},
	{
		path: 'matchs',
		loadChildren: () =>
			import('./matchs/matchs.module').then((m) => m.MatchsPageModule),
		canActivate: [AuthGuard],
	},
];
@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
