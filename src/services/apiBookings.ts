import { BookingFilter, BookingSort } from '@/types/bookings';
import supabase from './supabase';

export async function getBookings(
	userId: string | null | undefined,
	filter: BookingFilter | null,
	sort: BookingSort | null
) {
	if (!userId) return [];

	let query = supabase
		.from('booking')
		.select(
			'id, created_at, start_date, end_date, num_nights, num_guests, status, total_price, cabin(name, id), guest(id, full_name, email)'
		)
		.eq('user_id', userId);

	if (filter) {
		switch (filter.comparisonMethod) {
			case 'gt':
				query = query.gt(filter.field, filter.value);
				break;
			case 'gte':
				query = query.gte(filter.field, filter.value);
				break;
			case 'lt':
				query = query.lt(filter.field, filter.value);
				break;
			case 'lte':
				query = query.lte(filter.field, filter.value);
				break;
			default:
				query = query.eq(filter.field, filter.value);
				break;
		}
	}

	if (sort) {
		query = query.order(sort.field, { ascending: sort.direction === 'asc' });
	}

	const { data: bookings, error } = await query;

	if (error) {
		console.error(error);
		throw new Error('Bookings could not be loaded.');
	}

	return bookings;
}
