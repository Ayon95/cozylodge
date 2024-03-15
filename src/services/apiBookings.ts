import { BookingFilter, BookingSort } from '@/types/bookings';
import supabase from './supabase';
import { PAGE_SIZE } from '@/utils/constants';

type GetBookingsConfig = {
	filter: BookingFilter | null;
	sort: BookingSort | null;
	pageNum: number | null;
};

export async function getBookings(userId: string | null | undefined, config: GetBookingsConfig) {
	if (!userId) return { bookings: [], count: 0 };

	const { filter, sort, pageNum } = config;

	let query = supabase.from('booking').select('*, cabin(name, id), guest(*)').eq('user_id', userId);

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

	// Need to make an extra query to get the total count of bookings before pagination
	// If a query is made with the count option, it returns a response object with a count property
	// This causes problems when sending MSW mock responses
	const { data: nonPaginatedBookings, error: nonPaginatedBookingsError } = await query;

	if (nonPaginatedBookingsError) {
		console.error(nonPaginatedBookingsError);
		throw new Error('Bookings could not be loaded.');
	}

	if (pageNum) {
		const from = (pageNum - 1) * PAGE_SIZE;
		const to = from + PAGE_SIZE - 1;
		query = query.range(from, to);
	}

	const { data: bookings, error } = await query;

	if (error) {
		console.error(error);
		throw new Error('Bookings could not be loaded.');
	}

	return { bookings, count: nonPaginatedBookings ? nonPaginatedBookings.length : 0 };
}

export async function getBooking(bookingId: string | undefined, userId: string | null | undefined) {
	if (!bookingId || !userId) return null;

	const { data: booking, error } = await supabase
		.from('booking')
		.select('*, cabin(*), guest(*)')
		.eq('id', bookingId)
		.eq('user_id', userId)
		.single();

	if (error) {
		console.error(error);
		throw new Error('Booking could not be found.');
	}

	return booking;
}
