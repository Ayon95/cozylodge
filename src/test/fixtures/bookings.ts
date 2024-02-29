import { Booking } from '@/types/bookings';
import { cabins } from './cabins';
import { guests } from './guests';

export const bookings: Booking[] = [
	{
		id: 1,
		created_at: '2024-02-20T23:44:26.426083+00:00',
		start_date: '2024-02-20T18:42:34',
		end_date: '2024-02-22T18:42:39',
		num_nights: 2,
		num_guests: cabins[0].max_capacity,
		status: 'checked-out',
		total_price: cabins[0].regular_price + 50,
		cabin: {
			id: cabins[0].id,
			name: cabins[0].name,
		},
		guest: {
			id: guests[0].id,
			full_name: guests[0].full_name,
			email: guests[0].email,
		},
	},

	{
		id: 2,
		created_at: '2024-02-20T23:44:26.426083+00:00',
		start_date: '2024-02-20T18:42:34',
		end_date: '2024-02-24T18:42:39',
		num_nights: 4,
		num_guests: cabins[1].max_capacity,
		status: 'checked-out',
		total_price: cabins[1].regular_price + 100,
		cabin: {
			id: cabins[1].id,
			name: cabins[1].name,
		},
		guest: {
			id: guests[1].id,
			full_name: guests[1].full_name,
			email: guests[1].email,
		},
	},
];
