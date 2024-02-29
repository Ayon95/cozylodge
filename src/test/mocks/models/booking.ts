import { nullable, primaryKey } from '@mswjs/data';

const Booking = {
	id: primaryKey(Number),
	created_at: () => new Date().toISOString(),
	start_date: String,
	end_date: String,
	num_nights: Number,
	num_guests: Number,
	status: String,
	total_price: Number,
	// Making it nullable to satisfy the type returned by Supabase
	cabin: nullable({ id: Number, name: String }),
	guest: nullable({ id: Number, full_name: String, email: String }),
};

export default Booking;
