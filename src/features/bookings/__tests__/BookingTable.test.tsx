import { screen, within } from '@testing-library/react';

import { renderWithQueryClient } from '@/test/utils';
import BookingTable from '../BookingTable';
import { bookings } from '@/test/fixtures/bookings';
import { formatDate } from '@/utils/helpers';

function setup() {
	renderWithQueryClient(<BookingTable bookings={bookings} />);
}

describe('BookingTable', () => {
	it('should have all column headers in the correct order', () => {
		setup();
		const columnHeaders = screen.getAllByRole('columnheader');

		expect(columnHeaders[0]).toHaveTextContent(/cabin/i);
		expect(columnHeaders[1]).toHaveTextContent(/guest/i);
		expect(columnHeaders[2]).toHaveTextContent(/duration/i);
		expect(columnHeaders[3]).toHaveTextContent(/status/i);
		expect(columnHeaders[4]).toHaveTextContent(/price/i);
	});

	it('should have rows with booking details in the correct order', () => {
		setup();
		const rows = screen.getAllByRole('row');

		// The first row is the column header row
		[rows[1], rows[2]].forEach((row, i) => {
			const bookingCells = within(row).getAllByRole('cell');
			const booking = bookings[i];
			// Even though the type that Supabase returns indicates that cabin and guest can be nullable, it can't because a booking must be associated with a cabin and a guest
			const cabin = booking.cabin!;
			const guest = booking.guest!;

			expect(bookingCells[0]).toHaveTextContent(cabin.name);
			expect(bookingCells[1]).toHaveTextContent(`${guest.full_name}${guest.email}`);
			expect(bookingCells[2]).toHaveTextContent(
				`${booking.num_nights} night stay${formatDate(booking.start_date)} - ${formatDate(
					booking.end_date
				)}`
			);
			expect(bookingCells[3]).toHaveTextContent(booking.status);
			expect(bookingCells[4]).toHaveTextContent(`$${booking.total_price}.00`);
		});
	});
});
