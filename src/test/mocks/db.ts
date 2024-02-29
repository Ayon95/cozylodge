import { factory } from '@mswjs/data';
import Cabin from './models/cabin';
import { cabins } from '../fixtures/cabins';
import Booking from './models/booking';
import { bookings } from '../fixtures/bookings';

export const db = factory({
	cabin: Cabin,
	booking: Booking,
});

// Seed database with initial data

for (const cabin of cabins) {
	db.cabin.create(cabin);
}

for (const booking of bookings) {
	db.booking.create(booking);
}
