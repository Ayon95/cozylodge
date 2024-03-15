import { Booking } from '@/types/bookings';
import { cabins } from './cabins';
import { guests } from './guests';
import { user } from './authentication';

export const bookings: Booking[] = [
	{
		id: 1,
		created_at: '2024-02-20T23:44:26.426083+00:00',
		start_date: '2024-02-20T18:42:34',
		end_date: '2024-02-22T18:42:39',
		num_nights: 2,
		num_guests: cabins[0].max_capacity,
		status: 'checked-out',
		cabin_price: cabins[0].regular_price,
		extra_price: 50,
		total_price: cabins[0].regular_price + 50,
		has_breakfast: true,
		is_paid: true,
		cabin: {
			id: cabins[0].id,
			name: cabins[0].name,
		},
		guest: guests[0],
		observations: 'Test observations',
		user_id: user.id,
	},

	{
		id: 2,
		created_at: '2024-02-20T23:44:26.426083+00:00',
		start_date: '2024-02-21T18:42:34',
		end_date: '2024-02-25T18:42:39',
		num_nights: 4,
		num_guests: cabins[1].max_capacity,
		status: 'checked-in',
		cabin_price: cabins[1].regular_price,
		extra_price: 100,
		total_price: cabins[1].regular_price + 100,
		has_breakfast: true,
		is_paid: true,
		cabin: {
			id: cabins[1].id,
			name: cabins[1].name,
		},
		guest: guests[1],
		observations: null,
		user_id: user.id,
	},

	{
		id: 3,
		created_at: '2024-03-01T23:44:26.426083+00:00',
		start_date: '2024-04-10T18:42:34',
		end_date: '2024-04-15T18:42:39',
		num_nights: 5,
		num_guests: cabins[1].max_capacity,
		status: 'unconfirmed',
		cabin_price: cabins[1].regular_price,
		extra_price: 150,
		total_price: cabins[1].regular_price + 150,
		is_paid: false,
		has_breakfast: true,
		cabin: {
			id: cabins[1].id,
			name: cabins[1].name,
		},
		guest: guests[1],
		observations: null,
		user_id: user.id,
	},
];
