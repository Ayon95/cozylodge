import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import GlobalStyles from '@/styles/GlobalStyles';
import Dashboard from '@/pages/Dashboard';
import Bookings from '@/pages/Bookings';
import Cabins from '@/pages/Cabins';
import Settings from '@/pages/Settings';
import Account from '@/pages/Account';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import PageNotFound from '@/pages/PageNotFound';
import AppLayout from '@/ui/layout/AppLayout';
import ProtectedRoute from '@/features/authentication/ProtectedRoute';
import AuthLayout from '@/ui/layout/AuthLayout';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<GlobalStyles />
			<BrowserRouter>
				<Routes>
					<Route
						element={
							<ProtectedRoute>
								<AppLayout />
							</ProtectedRoute>
						}
					>
						<Route index element={<Navigate replace to="dashboard" />} />
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="bookings" element={<Bookings />} />
						<Route path="cabins" element={<Cabins />} />
						<Route path="settings" element={<Settings />} />
						<Route path="account" element={<Account />} />
					</Route>
					<Route
						path="login"
						element={
							<AuthLayout>
								<Login />
							</AuthLayout>
						}
					/>
					<Route
						path="signup"
						element={
							<AuthLayout>
								<Signup />
							</AuthLayout>
						}
					/>
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
			<Toaster />
		</QueryClientProvider>
	);
}

export default App;
