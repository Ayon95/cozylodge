import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import supabase from '@/services/supabase';

import { renderWithQueryClient } from '@/test/utils';
import Dashboard from '../Dashboard';
import { authResponse } from '@/test/fixtures/authentication';
import Signup from '../Signup';

beforeEach(() => {
	renderWithQueryClient(
		<MemoryRouter initialEntries={['/signup']}>
			<Routes>
				<Route path="dashboard" element={<Dashboard />} />
				<Route path="signup" element={<Signup />} />
			</Routes>
		</MemoryRouter>
	);
});

afterEach(() => {
	vi.restoreAllMocks();
});

describe('Signup', () => {
	it('should have a page title and link to login page', () => {
		expect(screen.getByRole('heading', { name: /create an account/i })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /log in/i })).toHaveAttribute('href', '/login');
	});

	it('should allow a visitor to sign up and navigate to dashboard page', async () => {
		vi.spyOn(supabase.auth, 'signUp').mockResolvedValueOnce(authResponse);
		const user = userEvent.setup();

		await user.type(screen.getByLabelText(/full name/i), 'Test User');
		await user.type(screen.getByLabelText(/email/i), 'user@test.com');
		await user.type(screen.getByLabelText(/^password$/i), 'test123');
		await user.type(screen.getByLabelText(/confirm password/i), 'test123');
		await user.click(screen.getByRole('button', { name: /sign up/i }));

		const dashboardTitle = screen.getByRole('heading', { name: /dashboard/i });

		expect(dashboardTitle).toBeInTheDocument();
	});
});
