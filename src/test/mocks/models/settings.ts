import { primaryKey } from '@mswjs/data';

const Settings = {
	id: primaryKey(Number),
	min_booking_length: Number,
	max_booking_length: Number,
	max_guests_per_booking: Number,
	breakfast_price: Number,
	user_id: String,
};

export default Settings;
