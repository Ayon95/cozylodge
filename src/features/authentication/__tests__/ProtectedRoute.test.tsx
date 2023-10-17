import { renderWithQueryClient } from '@/test/utils';
import { screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import AppLayout from '@/ui/layout/AppLayout';
import supabase from '@/services/supabase';
import { nonExistentSession, userSession } from '@/test/fixtures/authentication';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import AuthLayout from '@/ui/layout/AuthLayout';

beforeEach(() => {
	renderWithQueryClient(
		<MemoryRouter initialEntries={['/dashboard']}>
			<Routes>
				<Route
					element={
						<ProtectedRoute>
							<AppLayout />
						</ProtectedRoute>
					}
				>
					<Route path="dashboard" element={<Dashboard />} />
				</Route>
				<Route
					path="login"
					element={
						<AuthLayout>
							<Login />
						</AuthLayout>
					}
				/>
			</Routes>
		</MemoryRouter>
	);
});

afterEach(() => {
	vi.restoreAllMocks();
});

describe('ProtectedRoute', () => {
	it('should redirect user to login page if user session does not exist', async () => {
		vi.spyOn(supabase.auth, 'getSession').mockResolvedValueOnce(nonExistentSession);

		const loginForm = await screen.findByRole('form');

		expect(loginForm).toBeInTheDocument();
	});

	it('should allow an authenticated user to access a protected route', async () => {
		vi.spyOn(supabase.auth, 'getSession').mockResolvedValueOnce(userSession);

		const dashboardTitle = await screen.findByRole('heading', { name: /dashboard/i });

		expect(dashboardTitle).toBeInTheDocument();
	});
});
