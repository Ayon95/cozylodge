import { screen } from '@testing-library/react';
import { Toaster } from 'react-hot-toast';
import userEvent from '@testing-library/user-event';

import { renderWithQueryClient } from '@/test/utils';
import Settings from '../Settings';
import supabase from '@/services/supabase';
import { userSession } from '@/test/fixtures/authentication';
import { settings } from '@/test/fixtures/settings';
import { db } from '@/test/mocks/db';
import { mockServer } from '@/test/mocks/server';
import { SETTINGS_BASE_URL } from '@/utils/constants';
import { rest } from 'msw';

const formTitleRegex = /update hotel settings/i;

function setup() {
	renderWithQueryClient(<Settings />);
}

function setupWithLogin() {
	vi.spyOn(supabase.auth, 'getSession').mockResolvedValue(userSession);
	renderWithQueryClient(
		<>
			<Settings />
			<Toaster />
		</>
	);
}

afterEach(() => {
	vi.restoreAllMocks();
});

describe('Settings', () => {
	it('should have a page title', () => {
		setup();
		const titleElement = screen.getByRole('heading', { name: /update hotel settings/i });
		expect(titleElement).toBeInTheDocument();
	});

	it('should show an appropriate message and not show update settings form if there is no logged in user', async () => {
		setup();
		const messageElement = await screen.findByText(/settings could not be loaded/i);
		const updateSettingsForm = screen.queryByRole('form', { name: formTitleRegex });

		expect(messageElement).toBeInTheDocument();
		expect(updateSettingsForm).not.toBeInTheDocument();
	});

	it('should show update settings form if there is a logged in user', async () => {
		setupWithLogin();
		const updateSettingsForm = await screen.findByRole('form', { name: formTitleRegex });
		expect(updateSettingsForm).toBeInTheDocument();
	});

	it('should show updated settings and a success message when settings are updated', async () => {
		setupWithLogin();
		const user = userEvent.setup();

		const updatedSettings = {
			min_booking_length: settings.min_booking_length + 1,
			max_booking_length: settings.max_booking_length + 1,
			max_guests_per_booking: settings.max_guests_per_booking + 1,
			breakfast_price: settings.breakfast_price + 1,
		};

		const minNightsPerBookingInput = await screen.findByLabelText(/min nights per booking/i);
		const maxNightsPerBookingInput = screen.getByLabelText(/max nights per booking/i);
		const maxGuestsPerBookingInput = screen.getByLabelText(/max guests per booking/i);
		const breakfastPriceInput = screen.getByLabelText(/breakfast price/i);
		const submitButton = screen.getByRole('button', { name: /update settings/i });

		await user.clear(minNightsPerBookingInput);
		await user.type(minNightsPerBookingInput, updatedSettings.min_booking_length.toString());

		await user.clear(maxNightsPerBookingInput);
		await user.type(maxNightsPerBookingInput, updatedSettings.max_booking_length.toString());

		await user.clear(maxGuestsPerBookingInput);
		await user.type(maxGuestsPerBookingInput, updatedSettings.max_guests_per_booking.toString());

		await user.clear(breakfastPriceInput);
		await user.type(breakfastPriceInput, updatedSettings.breakfast_price.toString());

		await user.click(submitButton);

		const successMessage = await screen.findByText(/settings updated successfully!/i);
		const minNightsPerBookingInputWithUpdatedValue = screen.getByDisplayValue(
			updatedSettings.min_booking_length
		);
		const maxNightsPerBookingInputWithUpdatedValue = screen.getByDisplayValue(
			updatedSettings.max_booking_length
		);
		const maxGuestsPerBookingInputWithUpdatedValue = screen.getByDisplayValue(
			updatedSettings.max_guests_per_booking
		);
		const breakfastPriceInputWithUpdatedValue = screen.getByDisplayValue(
			updatedSettings.breakfast_price
		);

		[
			successMessage,
			minNightsPerBookingInputWithUpdatedValue,
			maxNightsPerBookingInputWithUpdatedValue,
			maxGuestsPerBookingInputWithUpdatedValue,
			breakfastPriceInputWithUpdatedValue,
		].forEach(element => {
			expect(element).toBeInTheDocument();
		});

		// Reset settings data
		db.settings.update({
			where: { id: { equals: 1 } },
			data: settings,
		});
	});

	it('should show update error message if settings cannot be updated', async () => {
		mockServer.use(
			rest.patch(SETTINGS_BASE_URL, (_req, res) => {
				return res.networkError('A network error occurred');
			})
		);

		setupWithLogin();
		const user = userEvent.setup();

		const minNightsPerBookingInput = await screen.findByLabelText(/min nights per booking/i);
		const submitButton = screen.getByRole('button', { name: /update settings/i });

		await user.clear(minNightsPerBookingInput);
		await user.type(minNightsPerBookingInput, (settings.min_booking_length + 1).toString());
		await user.click(submitButton);

		const errorMessage = await screen.findByText(
			(_, element) =>
				element?.tagName === 'P' && element.textContent === 'Settings could not be updated'
		);

		expect(errorMessage).toBeInTheDocument();
	});
});
