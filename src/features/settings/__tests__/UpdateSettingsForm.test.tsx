import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithQueryClient } from '@/test/utils';
import UpdateSettingsForm from '../UpdateSettingsForm';
import { settings } from '@/test/fixtures/settings';

const formTitleRegex = /update hotel settings/i;
const submitButtonRegex = /update settings/i;

function setup() {
	renderWithQueryClient(<UpdateSettingsForm settings={settings} />);
}

describe('UpdateSettingsForm', () => {
	it('should render a form element', () => {
		setup();
		const updateSettingsForm = screen.getByRole('form', { name: formTitleRegex });
		expect(updateSettingsForm).toBeInTheDocument();
	});

	it('should have all the necessary form fields and submit button', () => {
		setup();

		const minNightsPerBookingInput = screen.getByLabelText(/min nights per booking/i);
		const maxNightsPerBookingInput = screen.getByLabelText(/max nights per booking/i);
		const maxGuestsPerBookingInput = screen.getByLabelText(/max guests per booking/i);
		const breakfastPriceInput = screen.getByLabelText(/breakfast price/i);
		const submitButton = screen.getByRole('button', { name: submitButtonRegex });

		[
			minNightsPerBookingInput,
			maxNightsPerBookingInput,
			maxGuestsPerBookingInput,
			breakfastPriceInput,
			submitButton,
		].forEach(element => {
			expect(element).toBeInTheDocument();
		});
	});

	it('should have form fields pre-filled with settings data', () => {
		setup();

		const minNightsPerBookingInput = screen.getByDisplayValue(settings.min_booking_length);
		const maxNightsPerBookingInput = screen.getByDisplayValue(settings.max_booking_length);
		const maxGuestsPerBookingInput = screen.getByDisplayValue(settings.max_guests_per_booking);
		const breakfastPriceInput = screen.getByDisplayValue(settings.breakfast_price);

		[
			minNightsPerBookingInput,
			maxNightsPerBookingInput,
			maxGuestsPerBookingInput,
			breakfastPriceInput,
		].forEach(element => {
			expect(element).toBeInTheDocument();
		});
	});

	it('should show error messages if input values are not provided', async () => {
		setup();
		const user = userEvent.setup();

		await user.clear(screen.getByLabelText(/min nights per booking/i));
		await user.clear(screen.getByLabelText(/max nights per booking/i));
		await user.clear(screen.getByLabelText(/max guests per booking/i));
		await user.clear(screen.getByLabelText(/breakfast price/i));

		await user.click(screen.getByRole('button', { name: submitButtonRegex }));

		const minNightsPerBookingError = screen.getByText(
			/min nights per booking must be greater than 0/i
		);

		const maxNightsPerBookingError = screen.getByText(
			/max nights per booking must be greater than 0/i
		);

		const maxGuestsPerBookingError = screen.getByText(
			/max guests per booking must be greater than 0/i
		);

		const breakfastPriceError = screen.getByText(/breakfast price must be greater than 0/i);

		[
			minNightsPerBookingError,
			maxNightsPerBookingError,
			maxGuestsPerBookingError,
			breakfastPriceError,
		].forEach(element => {
			expect(element).toBeInTheDocument();
		});
	});
});
