import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import supabase from '@/services/supabase';

import { renderWithQueryClient } from '@/test/utils';
import Dashboard from '../Dashboard';
import Login from '../Login';
import { authResponse } from '@/test/fixtures/authentication';
import { Toaster } from 'react-hot-toast';

function setup() {
	renderWithQueryClient(
		<>
			<MemoryRouter initialEntries={['/login']}>
				<Routes>
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="login" element={<Login />} />
				</Routes>
			</MemoryRouter>
			<Toaster />
		</>
	);
}

afterEach(() => {
	vi.restoreAllMocks();
});

describe('Login', () => {
	it('should have a page title and link to Signup page', () => {
		setup();
		expect(screen.getByRole('heading', { name: /log in to your account/i })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /sign up/i })).toHaveAttribute('href', '/signup');
	});

	it('should allow a user to login and navigate to dashboard page', async () => {
		setup();
		vi.spyOn(supabase.auth, 'signInWithPassword').mockResolvedValueOnce(authResponse);
		const user = userEvent.setup();

		await user.type(screen.getByLabelText(/email/i), 'user@test.com');
		await user.type(screen.getByLabelText(/password/i), 'test123');
		await user.click(screen.getByRole('button', { name: /login/i }));

		const dashboardTitle = screen.getByRole('heading', { name: /dashboard/i });

		expect(dashboardTitle).toBeInTheDocument();
	});
});
