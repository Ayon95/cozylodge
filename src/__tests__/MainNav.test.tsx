import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import MainNav from '@/ui/MainNav';

afterEach(() => cleanup());

describe('Main Navigation', () => {
	it('should have Overview link that goes to Dashboard page', () => {
		render(<MainNav />, { wrapper: BrowserRouter });
		const overviewLink = screen.getByRole('link', { name: /overview/i });
		expect(overviewLink).toBeInTheDocument();
		expect(overviewLink).toHaveAttribute('href', '/dashboard');
	});

	it('should have Bookings link that goes to Bookings page', () => {
		render(<MainNav />, { wrapper: BrowserRouter });
		const overviewLink = screen.getByRole('link', { name: /bookings/i });
		expect(overviewLink).toBeInTheDocument();
		expect(overviewLink).toHaveAttribute('href', '/bookings');
	});

	it('should have Cabins link that goes to Cabins page', () => {
		render(<MainNav />, { wrapper: BrowserRouter });
		const overviewLink = screen.getByRole('link', { name: /cabins/i });
		expect(overviewLink).toBeInTheDocument();
		expect(overviewLink).toHaveAttribute('href', '/cabins');
	});

	it('should have Users link that goes to Users page', () => {
		render(<MainNav />, { wrapper: BrowserRouter });
		const overviewLink = screen.getByRole('link', { name: /users/i });
		expect(overviewLink).toBeInTheDocument();
		expect(overviewLink).toHaveAttribute('href', '/users');
	});

	it('should have Settings link that goes to Settings page', () => {
		render(<MainNav />, { wrapper: BrowserRouter });
		const overviewLink = screen.getByRole('link', { name: /settings/i });
		expect(overviewLink).toBeInTheDocument();
		expect(overviewLink).toHaveAttribute('href', '/settings');
	});
});
