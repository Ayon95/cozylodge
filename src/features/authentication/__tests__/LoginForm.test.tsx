import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import LoginForm from '../LoginForm';
import { renderWithQueryClient } from '@/test/utils';
import { MIN_PASSWORD_LENGTH } from '@/utils/constants';

const submitButtonRegex = /login/i;

function setup() {
	renderWithQueryClient(
		<BrowserRouter>
			<LoginForm />
		</BrowserRouter>
	);
}

describe('LoginForm', () => {
	it('should render a form element', () => {
		setup();
		expect(screen.getByRole('form', { name: /login/i })).toBeInTheDocument();
	});

	it('should have all the necessary fields and a submit button', () => {
		setup();
		const emailInput = screen.getByLabelText(/email address/i);
		const passwordInput = screen.getByLabelText(/password/i);
		const loginButton = screen.getByRole('button', { name: submitButtonRegex });

		expect(emailInput).toBeInTheDocument();
		expect(passwordInput).toBeInTheDocument();
		expect(loginButton).toBeInTheDocument();
	});

	it('should show error messages if required input values are not provided', async () => {
		setup();
		const user = userEvent.setup();

		await user.click(screen.getByRole('button', { name: submitButtonRegex }));

		const missingEmailError = screen.getByText(/email is required/i);
		const missingPasswordError = screen.getByText(/password is required/i);

		expect(missingEmailError).toBeInTheDocument();
		expect(missingPasswordError).toBeInTheDocument();
	});

	it('should show error message if invalid email is provided', async () => {
		setup();
		const user = userEvent.setup();

		await user.type(screen.getByLabelText(/email address/i), 'test@');
		await user.click(screen.getByRole('button', { name: submitButtonRegex }));

		const invalidEmailError = screen.getByText(/invalid email address/i);

		expect(invalidEmailError).toBeInTheDocument();
	});

	it('should show error message if password has fewer than minimum characters', async () => {
		setup();
		const user = userEvent.setup();
		const password = '*'.repeat(MIN_PASSWORD_LENGTH - 1);

		await user.type(screen.getByLabelText(/password/i), password);
		await user.click(screen.getByRole('button', { name: submitButtonRegex }));

		const minPasswordCharacterError = screen.getByText(
			`Password must be at least ${MIN_PASSWORD_LENGTH} characters`
		);

		expect(minPasswordCharacterError).toBeInTheDocument();
	});
});
