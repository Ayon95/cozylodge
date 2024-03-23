import { Tables } from '@/types/database';
import { user } from './authentication';

export const settings: Tables<'settings'> = {
	id: 1,
	created_at: '2024-03-21T01:38:13.379438+00:00',
	min_booking_length: 1,
	max_booking_length: 30,
	max_guests_per_booking: 8,
	breakfast_price: 15,
	user_id: user.id,
};
