import { Tables } from '@/types/database';
import { user } from './authentication';

export const guests: Tables<'guest'>[] = [
	{
		id: 1,
		full_name: 'John Doe',
		email: 'john12@example.com',
		national_id: null,
		nationality: 'Canada',
		country_flag: null,
		user_id: user.id,
		created_at: '2024-02-20 20:42:58.03428+00',
	},

	{
		id: 2,
		full_name: 'Mary Smith',
		email: 'mary34@example.com',
		national_id: null,
		nationality: 'Canada',
		country_flag: null,
		user_id: user.id,
		created_at: '2024-02-20 20:42:58.03428+00',
	},
];
