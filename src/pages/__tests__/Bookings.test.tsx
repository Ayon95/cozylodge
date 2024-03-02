import { screen, within } from '@testing-library/react';
import { rest } from 'msw';

import supabase from '@/services/supabase';
import { userSession } from '@/test/fixtures/authentication';
import { renderWithQueryClient } from '@/test/utils';
import Bookings from '../Bookings';
import { mockServer } from '@/test/mocks/server';
import { BOOKINGS_BASE_URL } from '@/utils/constants';
import { MemoryRouter } from 'react-router-dom';

function setup() {
	renderWithQueryClient(
		<MemoryRouter>
			<Bookings />
		</MemoryRouter>
	);
}

function setupWithLogin(initialPath: string = '') {
	// Setting logged in user
	vi.spyOn(supabase.auth, 'getSession').mockResolvedValue(userSession);

	renderWithQueryClient(
		<MemoryRouter initialEntries={[initialPath]}>
			<Bookings />
		</MemoryRouter>
	);
}

afterEach(() => {
	vi.restoreAllMocks();
});

describe('Bookings', () => {
	it('should have page title', () => {
		setup();
		const titleElement = screen.getByRole('heading', { name: /bookings/i });
		expect(titleElement).toBeInTheDocument();
	});

	it('should show an appropriate message and not show booking table if there is no logged in user', async () => {
		setup();

		const noBookingsTextElement = await screen.findByText(/no bookings to show/i);
		const bookingTable = screen.queryByRole('table', { name: /bookings/i });

		expect(noBookingsTextElement).toBeInTheDocument();
		expect(bookingTable).not.toBeInTheDocument();
	});

	it('should show an appropriate message and not show booking table if there are no bookings', async () => {
		mockServer.use(
			rest.get(BOOKINGS_BASE_URL, (_req, res, ctx) => {
				return res(ctx.json([]));
			})
		);

		setupWithLogin();

		const noBookingsTextElement = await screen.findByText(/no bookings to show/i);
		const bookingTable = screen.queryByRole('table', { name: /bookings/i });

		expect(noBookingsTextElement).toBeInTheDocument();
		expect(bookingTable).not.toBeInTheDocument();
	});

	it('should show booking table if there is a logged in user and there are bookings', async () => {
		setupWithLogin();
		const bookingTable = await screen.findByRole('table', { name: /bookings/i });
		expect(bookingTable).toBeInTheDocument();
	});

	it('should show booking status filter controls', () => {
		setup();

		const elements = [
			screen.getByRole('button', { name: /all/i }),
			screen.getByRole('button', { name: /unconfirmed/i }),
			screen.getByRole('button', { name: /^checked-in$/i }),
			screen.getByRole('button', { name: /^checked-out$/i }),
		];

		elements.forEach(element => expect(element).toBeInTheDocument());
	});

	it('should show a select control with sort options', () => {
		setup();

		const sortBySelect = screen.getByLabelText(/sort by/i);

		expect(sortBySelect).toBeInTheDocument();

		const options = [
			within(sortBySelect).getByRole('option', { name: /sort by/i }),
			within(sortBySelect).getByRole('option', { name: /^date \(latest to oldest\)$/i }),
			within(sortBySelect).getByRole('option', { name: /^date \(oldest to latest\)$/i }),
			within(sortBySelect).getByRole('option', { name: /^price \(highest to lowest\)$/i }),
			within(sortBySelect).getByRole('option', { name: /^price \(lowest to highest\)$/i }),
		];

		options.forEach(option => expect(option).toBeInTheDocument());
	});

	it('should only show bookings with unconfirmed status if unconfirmed filter is selected', async () => {
		setupWithLogin('?status=unconfirmed');

		const bookingRows = await screen.findAllByRole('row');

		// In bookings fixture, there is one booking with unconfirmed status
		// The first row in bookingRows is the column header row
		expect(bookingRows.length - 1).toEqual(1);
	});

	it('should only show bookings with checked-in status if checked-in filter is selected', async () => {
		setupWithLogin('?status=checked-in');

		const bookingRows = await screen.findAllByRole('row');

		// In bookings fixture, there is one booking with checked-in status
		expect(bookingRows.length - 1).toEqual(1);
	});

	it('should only show bookings with checked-out status if checked-out filter is selected', async () => {
		setupWithLogin('?status=checked-out');

		const bookingRows = await screen.findAllByRole('row');

		// In bookings fixture, there is one booking with checked-out status
		expect(bookingRows.length - 1).toEqual(1);
	});

	it('should sort bookings by price in ascending order correctly', async () => {
		setupWithLogin('?sort=total_price-asc');

		const bookingRows = await screen.findAllByRole('row');

		// The first row in bookingRows is the column header row

		const firstBookingCells = within(bookingRows[1]).getAllByRole('cell');
		const secondBookingCells = within(bookingRows[2]).getAllByRole('cell');
		const thirdBookingCells = within(bookingRows[3]).getAllByRole('cell');

		expect(firstBookingCells[4]).toHaveTextContent('$300.00');
		expect(secondBookingCells[4]).toHaveTextContent('$600.00');
		expect(thirdBookingCells[4]).toHaveTextContent('$650.00');
	});

	it('should sort bookings by price in descending order correctly', async () => {
		setupWithLogin('?sort=total_price-desc');

		const bookingRows = await screen.findAllByRole('row');

		const firstBookingCells = within(bookingRows[1]).getAllByRole('cell');
		const secondBookingCells = within(bookingRows[2]).getAllByRole('cell');
		const thirdBookingCells = within(bookingRows[3]).getAllByRole('cell');

		expect(firstBookingCells[4]).toHaveTextContent('$650.00');
		expect(secondBookingCells[4]).toHaveTextContent('$600.00');
		expect(thirdBookingCells[4]).toHaveTextContent('$300.00');
	});

	it('should sort bookings by start date in ascending order correctly', async () => {
		setupWithLogin('?sort=start_date-asc');

		const bookingRows = await screen.findAllByRole('row');

		const firstBookingCells = within(bookingRows[1]).getAllByRole('cell');
		const secondBookingCells = within(bookingRows[2]).getAllByRole('cell');
		const thirdBookingCells = within(bookingRows[3]).getAllByRole('cell');

		expect(firstBookingCells[2]).toHaveTextContent(/feb 20, 2024/i);
		expect(secondBookingCells[2]).toHaveTextContent(/feb 21, 2024/i);
		expect(thirdBookingCells[2]).toHaveTextContent(/apr 10, 2024/i);
	});

	it('should sort bookings by start date in descending order correctly', async () => {
		setupWithLogin('?sort=start_date-desc');

		const bookingRows = await screen.findAllByRole('row');

		const firstBookingCells = within(bookingRows[1]).getAllByRole('cell');
		const secondBookingCells = within(bookingRows[2]).getAllByRole('cell');
		const thirdBookingCells = within(bookingRows[3]).getAllByRole('cell');

		expect(firstBookingCells[2]).toHaveTextContent(/apr 10, 2024/i);
		expect(secondBookingCells[2]).toHaveTextContent(/feb 21, 2024/i);
		expect(thirdBookingCells[2]).toHaveTextContent(/feb 20, 2024/i);
	});
});
