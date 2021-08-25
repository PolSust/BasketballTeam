import { User } from './user.model';

export interface Match {
	id: string;
	name: string;
	date: any;
	city: string;
	players: User[];
	location: {
		latitude: number;
		longitude: number;
	};
}
