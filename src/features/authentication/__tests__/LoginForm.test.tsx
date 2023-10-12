import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import LoginForm from '../LoginForm';
import { renderWithQueryClient } from '@/test/utils';
import { MIN_PASSWORD_LENGTH } from '@/utils/constants';

beforeEach(() => {
	renderWithQueryClient(
		<BrowserRouter>
			<LoginForm />
		</BrowserRouter>
	);
});

describe('LoginForm', () => {
	it('should render a form element', () => {
		expect(screen.getByRole('form')).toBeInTheDocument();
	});

	it('should have email and password fields and login button', () => {
		const emailInput = screen.getByLabelText(/email address/i);
		const passwordInput = screen.getByLabelText(/password/i);
		const loginButton = screen.getByRole('button', { name: /login/i });

		expect(emailInput).toBeInTheDocument();
		expect(passwordInput).toBeInTheDocument();
		expect(loginButton).toBeInTheDocument();
	});

	it('should show error message if required input values are not provided', async () => {
		const user = userEvent.setup();

		user.click(screen.getByRole('button', { name: /login/i }));

		const missingEmailError = await screen.findByText(/email is required/i);
		const missingPasswordError = await screen.findByText(/password is required/i);

		expect(missingEmailError).toBeInTheDocument();
		expect(missingPasswordError).toBeInTheDocument();
	});

	it('should show error message if invalid email is provided', async () => {
		const user = userEvent.setup();

		await user.type(screen.getByLabelText(/email address/i), 'test@');
		user.click(screen.getByRole('button', { name: /login/i }));

		const invalidEmailError = await screen.findByText(/invalid email address/i);

		expect(invalidEmailError).toBeInTheDocument();
	});

	it('should show error message if password has fewer than minimum characters', async () => {
		const user = userEvent.setup();
		const password = '*'.repeat(MIN_PASSWORD_LENGTH - 1);

		await user.type(screen.getByLabelText(/password/i), password);
		user.click(screen.getByRole('button', { name: /login/i }));

		const minPasswordCharacterError = await screen.findByText(
			`Password must be at least ${MIN_PASSWORD_LENGTH} characters`
		);

		expect(minPasswordCharacterError).toBeInTheDocument();
	});
});
