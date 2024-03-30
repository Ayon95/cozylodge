import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';

import { renderWithQueryClient } from '@/test/utils';
import BookingRow from '../BookingRow';
import { Booking } from '@/types/bookings';
import { bookings } from '@/test/fixtures/bookings';

function setup(booking: Booking) {
	renderWithQueryClient(
		<MemoryRouter>
			<table>
				<tbody>
					<BookingRow booking={booking} />
				</tbody>
			</table>
		</MemoryRouter>
	);
}

describe('BookingRow', () => {
	it('should have a checkout button if the booking status is checked-in', () => {
		setup(bookings[1]);
		const checkoutButton = screen.getByRole('button', { name: /check out/i });
		expect(checkoutButton).toBeInTheDocument();
	});

	it('should not have a checkout button if the booking status is not checked-in', () => {
		setup(bookings[0]);
		const checkoutButton = screen.queryByRole('button', { name: /check out/i });
		expect(checkoutButton).not.toBeInTheDocument();
	});
});
