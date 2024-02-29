import { rest } from 'msw';

import { BOOKINGS_BASE_URL } from '@/utils/constants';
import { db } from '../db';

export const bookingHandlers = [
	rest.get(BOOKINGS_BASE_URL, (_req, res, ctx) => {
		const bookings = db.booking.getAll();
		return res(ctx.json(bookings));
	}),
];
