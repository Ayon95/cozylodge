import { MemoryRouter } from 'react-router-dom';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithQueryClient } from '@/test/utils';
import BookingRow from '../BookingRow';
import { Booking } from '@/types/bookings';
import { bookings } from '@/test/fixtures/bookings';

const mockOnClickDelete = vi.fn();

function setup(booking: Booking) {
	renderWithQueryClient(
		<MemoryRouter>
			<table>
				<tbody>
					<BookingRow booking={booking} onClickDelete={mockOnClickDelete} />
				</tbody>
			</table>
		</MemoryRouter>
	);
}

afterEach(() => {
	vi.restoreAllMocks();
});

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

	it('should have an actions cell with a delete button', () => {
		setup(bookings[0]);

		const actionsCell = screen.getAllByRole('cell')[5];
		const deleteButton = within(actionsCell).getByRole('button', { name: /delete/i });

		expect(deleteButton).toBeInTheDocument();
	});

	it('should call onClickDelete with booking data when delete button is clicked', async () => {
		const booking = bookings[0];
		setup(booking);
		const user = userEvent.setup();
		const actionsCell = screen.getAllByRole('cell')[5];
		const deleteButton = within(actionsCell).getByRole('button', { name: /delete/i });

		await user.click(deleteButton);

		expect(mockOnClickDelete).toHaveBeenCalledWith(booking);
	});
});
