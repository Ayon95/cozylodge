import { screen } from '@testing-library/react';
import { rest } from 'msw';

import supabase from '@/services/supabase';
import { userSession } from '@/test/fixtures/authentication';
import { renderWithQueryClient } from '@/test/utils';
import Bookings from '../Bookings';
import { mockServer } from '@/test/mocks/server';
import { BOOKINGS_BASE_URL } from '@/utils/constants';

function setup() {
	renderWithQueryClient(<Bookings />);
}

function setupWithLogin() {
	// Setting logged in user
	vi.spyOn(supabase.auth, 'getSession').mockResolvedValue(userSession);

	renderWithQueryClient(<Bookings />);
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
});
