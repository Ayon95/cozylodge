import { factory } from '@mswjs/data';
import Cabin from './models/cabin';
import { cabins } from '../fixtures/cabins';
import Booking from './models/booking';
import { bookings } from '../fixtures/bookings';
import Settings from './models/settings';
import { settings } from '../fixtures/settings';

export const db = factory({
	cabin: Cabin,
	booking: Booking,
	settings: Settings,
});

// Seed database with initial data

db.settings.create(settings);

for (const cabin of cabins) {
	db.cabin.create(cabin);
}

for (const booking of bookings) {
	db.booking.create(booking);
}
