import { Tables } from '@/types/database';
import { user } from './authentication';

export const cabins: Tables<'cabin'>[] = [
	{
		id: 1,
		created_at: '2023-09-16T01:38:13.379438+00:00',
		name: 'Test 001',
		max_capacity: 2,
		regular_price: 250,
		discount: 50,
		description: 'A small luxury cabin in the woods',
		image_url: 'test url 1',
		user_id: user.id,
	},
	{
		id: 2,
		created_at: '2023-09-16T01:38:13.379438+00:00',
		name: 'Test 002',
		max_capacity: 4,
		regular_price: 500,
		discount: 75,
		description: 'Comfortable cabin for a small family',
		image_url: 'test url 2',
		user_id: user.id,
	},
];
