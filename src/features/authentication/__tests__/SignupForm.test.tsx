import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import { renderWithQueryClient } from '@/test/utils';
import { MIN_FULL_NAME_LENGTH, MIN_PASSWORD_LENGTH } from '@/utils/constants';
import CreateUserForm from '../SignupForm';

const submitButtonRegex = /sign up/i;

beforeEach(() => {
	renderWithQueryClient(
		<BrowserRouter>
			<CreateUserForm />
		</BrowserRouter>
	);
});

describe('CreateUserForm', () => {
	it('should render a form element', () => {
		expect(screen.getByRole('form', { name: /create an account/i }));
	});

	it('should have all the necessary fields and a submit button', () => {
		const fullNameInput = screen.getByLabelText(/full name/i);
		const emailInput = screen.getByLabelText(/email/i);
		const passwordInput = screen.getByLabelText(/^password$/i);
		const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
		const submitButton = screen.getByRole('button', { name: submitButtonRegex });

		expect(fullNameInput).toBeInTheDocument();
		expect(emailInput).toBeInTheDocument();
		expect(passwordInput).toBeInTheDocument();
		expect(confirmPasswordInput).toBeInTheDocument();
		expect(submitButton).toBeInTheDocument();
	});

	it('should show error messages if required input values are not provided', async () => {
		const user = userEvent.setup();

		user.click(screen.getByRole('button', { name: submitButtonRegex }));

		const missingFullNameError = await screen.findByText(/full name is required/i);
		const missingEmailError = await screen.findByText(/email is required/i);
		const missingPasswordError = await screen.findByText(/password is required/i);

		expect(missingFullNameError).toBeInTheDocument();
		expect(missingEmailError).toBeInTheDocument();
		expect(missingPasswordError).toBeInTheDocument();
	});

	it('should show error message if full name has fewer than minimum characters', async () => {
		const user = userEvent.setup();
		const fullName = '*'.repeat(MIN_FULL_NAME_LENGTH - 1);

		await user.type(screen.getByLabelText(/full name/i), fullName);
		await user.click(screen.getByRole('button', { name: submitButtonRegex }));

		const minFullNameCharacterError = screen.getByText(
			`Full name must have at least ${MIN_FULL_NAME_LENGTH} characters`
		);

		expect(minFullNameCharacterError).toBeInTheDocument();
	});

	it('should show error message if invalid email is provided', async () => {
		const user = userEvent.setup();

		await user.type(screen.getByLabelText(/email address/i), 'test@');
		await user.click(screen.getByRole('button', { name: submitButtonRegex }));

		const invalidEmailError = screen.getByText(/invalid email address/i);

		expect(invalidEmailError).toBeInTheDocument();
	});

	it('should show error message if password has fewer than minimum characters', async () => {
		const user = userEvent.setup();
		const password = '*'.repeat(MIN_PASSWORD_LENGTH - 1);

		await user.type(screen.getByLabelText(/^password$/i), password);
		await user.click(screen.getByRole('button', { name: submitButtonRegex }));

		const minPasswordCharacterError = screen.getByText(
			`Password must be at least ${MIN_PASSWORD_LENGTH} characters`
		);

		expect(minPasswordCharacterError).toBeInTheDocument();
	});

	it('should show error message if passwords do not match', async () => {
		const user = userEvent.setup();
		const password = 'test123';
		const confirmPassword = 'test123456';

		await user.type(screen.getByLabelText(/^password$/i), password);
		await user.type(screen.getByLabelText(/confirm password/i), confirmPassword);
		await user.click(screen.getByRole('button', { name: submitButtonRegex }));

		const passwordMismatchError = screen.getByText(/passwords must match/i);

		expect(passwordMismatchError).toBeInTheDocument();
	});
});
