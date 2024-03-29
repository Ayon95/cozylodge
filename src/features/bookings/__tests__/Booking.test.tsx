import { screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import Booking from '@/pages/Booking';
import supabase from '@/services/supabase';
import { userSession } from '@/test/fixtures/authentication';
import { renderWithQueryClient } from '@/test/utils';
import { bookings } from '@/test/fixtures/bookings';
import { formatDate, formatPrice } from '@/utils/helpers';

const dateFormatOptions: Intl.DateTimeFormatOptions = {
	weekday: 'short',
	month: 'short',
	day: '2-digit',
	year: 'numeric',
};

function setup(bookingId: number = 1) {
	vi.spyOn(supabase.auth, 'getSession').mockResolvedValue(userSession);
	renderWithQueryClient(
		<MemoryRouter initialEntries={[`/bookings/${bookingId}`]}>
			<Routes>
				<Route path="bookings/:bookingId" element={<Booking />} />
			</Routes>
		</MemoryRouter>
	);
}

afterEach(() => {
	vi.restoreAllMocks();
});

describe('Booking', () => {
	it('should have a header with title, booking status, and link to Bookings page', async () => {
		setup();
		const booking = bookings[0];
		const titleElement = await screen.findByRole('heading', { name: `Booking #${booking.id}` });
		const statusElement = screen.getByText(booking.status);
		const bookingsLink = screen.getByRole('link', { name: /bookings/i });

		[titleElement, statusElement, bookingsLink].forEach(element => {
			expect(element).toBeInTheDocument();
		});
	});

	it('should have booking date', async () => {
		setup();

		const bookingDate = await screen.findByText(
			(_, element) =>
				element?.textContent ===
				`Booked on ${formatDate(bookings[0].created_at, dateFormatOptions)}`
		);

		expect(bookingDate).toBeInTheDocument();
	});

	it('should have booking duration details', async () => {
		setup();
		const booking = bookings[0];

		const numNightsAndCabinTextElement = await screen.findByText(
			(_, element) =>
				element?.tagName === 'P' &&
				element?.textContent === `${booking.num_nights} nights in Cabin ${booking.cabin?.name}`
		);

		const checkInDate = screen.getByText(
			(_, element) =>
				element?.textContent === `Check-in${formatDate(booking.start_date, dateFormatOptions)}`
		);

		const checkOutDate = screen.getByText(
			(_, element) =>
				element?.textContent === `Check-out${formatDate(booking.end_date, dateFormatOptions)}`
		);

		[numNightsAndCabinTextElement, checkInDate, checkOutDate].forEach(element => {
			expect(element).toBeInTheDocument();
		});
	});

	it('should have guest details', async () => {
		setup();

		const guestDetailsTitle = await screen.findByRole('heading', { name: /guest details/i });
		const guestDetailsTable = screen.getByRole('table', { name: /guest details/i });
		const guestDetailsTableColumnHeaders = within(guestDetailsTable).getAllByRole('columnheader');

		expect(guestDetailsTitle).toBeInTheDocument();
		expect(guestDetailsTable).toBeInTheDocument();
		expect(guestDetailsTableColumnHeaders[0]).toHaveTextContent(/name/i);
		expect(guestDetailsTableColumnHeaders[1]).toHaveTextContent(/email/i);
		expect(guestDetailsTableColumnHeaders[2]).toHaveTextContent(/total guests/i);
		expect(guestDetailsTableColumnHeaders[3]).toHaveTextContent(/country/i);
		expect(guestDetailsTableColumnHeaders[4]).toHaveTextContent(/national id/i);
	});

	it('should have observations section if the booking has observations', async () => {
		setup();

		const observationsSectionTitle = await screen.findByRole('heading', {
			name: /observations & requests/i,
		});

		const observations = screen.getByText(bookings[0].observations as string);

		expect(observationsSectionTitle).toBeInTheDocument();
		expect(observations).toBeInTheDocument();
	});

	it('should have payment summary section', async () => {
		setup();

		const booking = bookings[0];
		const paymentSummaryTitle = await screen.findByRole('heading', { name: /payment summary/i });
		const paymentStatus = screen.getByText(booking.is_paid ? 'paid' : 'not paid');

		const cabinPrice = screen.getByText(
			(_, element) =>
				element?.tagName === 'P' &&
				element?.textContent === `Cabin: ${formatPrice(booking.cabin_price)}`
		);

		const extraPrice = screen.getByText(
			(_, element) =>
				element?.tagName === 'P' &&
				element.textContent === `Extra: ${formatPrice(booking.extra_price)}`
		);

		const breakfastText = screen.getByText(/includes breakfast/i);

		const totalPrice = screen.getByText(
			(_, element) =>
				element?.tagName === 'P' &&
				element.textContent === `Total: ${formatPrice(booking.total_price)}`
		);

		[paymentSummaryTitle, paymentStatus, cabinPrice, extraPrice, breakfastText, totalPrice].forEach(
			element => expect(element).toBeInTheDocument()
		);
	});
});
