import supabase from './supabase';

export async function getBookings(userId: string | null | undefined) {
	if (!userId) return [];

	const { data: bookings, error } = await supabase
		.from('booking')
		.select(
			'id, created_at, start_date, end_date, num_nights, num_guests, status, total_price, cabin(name, id), guest(id, full_name, email)'
		)
		.eq('user_id', userId);

	if (error) {
		console.error(error);
		throw new Error('Bookings could not be loaded.');
	}

	return bookings;
}
