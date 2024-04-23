import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { rest } from 'msw';

import Booking from '@/pages/Booking';
import supabase from '@/services/supabase';
import { userSession } from '@/test/fixtures/authentication';
import { renderWithQueryClient } from '@/test/utils';
import { bookings } from '@/test/fixtures/bookings';
import { formatDate, formatPrice } from '@/utils/helpers';
import { db } from '@/test/mocks/db';
import { mockServer } from '@/test/mocks/server';
import { BOOKINGS_BASE_URL } from '@/utils/constants';
import Bookings from '@/pages/Bookings';

const dateFormatOptions: Intl.DateTimeFormatOptions = {
	weekday: 'short',
	month: 'short',
	day: '2-digit',
	year: 'numeric',
};

const confirmDeleteModalTitleRegex = /are you sure you want to delete?/i;

function setup(bookingId: number = 1) {
	vi.spyOn(supabase.auth, 'getSession').mockResolvedValue(userSession);
	renderWithQueryClient(
		<MemoryRouter initialEntries={[`/bookings/${bookingId}`]}>
			<Routes>
				<Route path="bookings" element={<Bookings />} />
				<Route path="bookings/:bookingId" element={<Booking />} />
			</Routes>
			<Toaster />
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

	it('should have a checkout button if the booking status is checked-in', async () => {
		setup(2);
		const checkoutButton = await screen.findByRole('button', { name: /check out/i });
		expect(checkoutButton).toBeInTheDocument();
	});

	it('should show success message and updated status if a checked-in booking is checked-out', async () => {
		setup(2);
		const user = userEvent.setup();
		const checkoutButton = await screen.findByRole('button', { name: /check out/i });

		await user.click(checkoutButton);

		const successMessage = await screen.findByText(
			`Booking #${bookings[1].id} updated successfully!`
		);
		const checkedOutStatus = screen.getByText(/checked-out/i);

		expect(successMessage).toBeInTheDocument();
		expect(checkedOutStatus).toBeInTheDocument();

		// Resetting status of the updated booking

		db.booking.update({
			where: { id: { equals: bookings[1].id } },
			data: { status: 'checked-in' },
		});
	});

	it('should show update error message if a checked-in booking cannot be updated', async () => {
		mockServer.use(
			rest.patch(BOOKINGS_BASE_URL, (_req, res) => {
				return res.networkError('A network error occurred');
			})
		);

		setup(2);
		const user = userEvent.setup();
		const checkoutButton = await screen.findByRole('button', { name: /check out/i });

		await user.click(checkoutButton);

		const errorMessage = screen.getByText(/booking could not be updated/i);
		const checkedOutStatus = screen.queryByText(/checked-out/i);

		expect(errorMessage).toBeInTheDocument();
		expect(checkedOutStatus).not.toBeInTheDocument();
	});

	it('should have a delete button', async () => {
		setup();
		const deleteButton = await screen.findByRole('button', { name: /delete/i });
		expect(deleteButton).toBeInTheDocument();
	});

	it('should show confirm delete modal when delete button is clicked', async () => {
		setup();

		const user = userEvent.setup();
		const deleteButton = await screen.findByRole('button', { name: /delete/i });

		await user.click(deleteButton);

		const confirmDeleteModal = screen.getByRole('dialog', {
			name: confirmDeleteModalTitleRegex,
		});
		const confirmDeleteButton = within(confirmDeleteModal).getByRole('button', {
			name: /delete/i,
		});

		expect(confirmDeleteModal).toBeInTheDocument();
		expect(confirmDeleteButton).toBeInTheDocument();
	});

	it('should show deletion error message if a booking cannot be deleted', async () => {
		mockServer.use(
			rest.delete(BOOKINGS_BASE_URL, (_req, res) => {
				return res.networkError('A network error occurred');
			})
		);

		setup();

		const user = userEvent.setup();
		const deleteButton = await screen.findByRole('button', { name: /delete/i });

		await user.click(deleteButton);

		const confirmDeleteModal = screen.getByRole('dialog', { name: confirmDeleteModalTitleRegex });
		const confirmDeleteButton = within(confirmDeleteModal).getByRole('button', { name: /delete/i });

		await user.click(confirmDeleteButton);

		const toast = await screen.findByText(/booking could not be deleted/i);

		expect(toast).toBeInTheDocument();
	});
});
