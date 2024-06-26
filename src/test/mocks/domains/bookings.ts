import { rest } from 'msw';
import { SortDirection } from '@mswjs/data/lib/query/queryTypes';

import { BOOKINGS_BASE_URL, PAGE_SIZE } from '@/utils/constants';
import { db } from '../db';
import { getIdFromQueryString } from '@/utils/helpers';

export const bookingHandlers = [
	rest.get(BOOKINGS_BASE_URL, (req, res, ctx) => {
		const url = new URL(req.url);

		// In case of an individual booking, there will be an id query param, e.g. id=eq.1
		const bookingIdValue = url.searchParams.get('id')?.split('.')[1];

		if (bookingIdValue) {
			const booking = db.booking.findFirst({
				where: {
					id: { equals: Number.parseFloat(bookingIdValue) },
				},
			});

			return res(ctx.json(booking));
		}

		// the query param value will be like 'eq.unconfirmed', ?status=eq.unconfirmed
		const statusFilterValue = url.searchParams.get('status')?.split('.')[1];

		// the sort query param will be like order=total_price.desc
		const sortValue = url.searchParams.get('order');

		// Pagination query params will be like offset=0 and limit=5
		const offsetValue = url.searchParams.get('offset');

		if (statusFilterValue && sortValue) {
			const [sortBy, sortDirection] = sortValue.split('.');
			const where = { status: { equals: statusFilterValue } };

			if (sortBy === 'start_date') {
				const bookings = db.booking.findMany({
					where,
					orderBy: { start_date: sortDirection as SortDirection },
				});
				return res(ctx.json(bookings));
			}

			if (sortBy === 'total_price') {
				const bookings = db.booking.findMany({
					where,
					orderBy: { total_price: sortDirection as SortDirection },
				});
				return res(ctx.json(bookings));
			}

			const bookings = db.booking.findMany({ where });
			return res(ctx.json(bookings));
		}

		if (statusFilterValue) {
			const bookings = db.booking.findMany({ where: { status: { equals: statusFilterValue } } });
			return res(ctx.json(bookings));
		}

		if (sortValue) {
			const [sortBy, sortDirection] = sortValue.split('.');

			if (sortBy === 'start_date') {
				const bookings = db.booking.findMany({
					orderBy: { start_date: sortDirection as SortDirection },
				});
				return res(ctx.json(bookings));
			}

			if (sortBy === 'total_price') {
				const bookings = db.booking.findMany({
					orderBy: { total_price: sortDirection as SortDirection },
				});
				return res(ctx.json(bookings));
			}
		}

		if (offsetValue) {
			const bookings = db.booking.findMany({
				skip: Number.parseFloat(offsetValue),
				take: PAGE_SIZE,
			});
			return res(ctx.json(bookings));
		}

		const bookings = db.booking.getAll();
		return res(ctx.json(bookings));
	}),
	rest.patch(BOOKINGS_BASE_URL, async (req, res, ctx) => {
		const bookingId = getIdFromQueryString(req.url);
		const data = await req.json();

		const updatedBooking = db.booking.update({ where: { id: { equals: bookingId } }, data });
		return res(ctx.json(updatedBooking), ctx.status(204));
	}),
	rest.delete(BOOKINGS_BASE_URL, (req, res, ctx) => {
		const bookingId = getIdFromQueryString(req.url);
		db.booking.delete({ where: { id: { equals: bookingId } } });
		return res(ctx.status(204));
	}),
];
