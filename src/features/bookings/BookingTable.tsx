import { Booking } from '@/types/bookings';
import Table from '@/ui/Table';
import BookingRow from './BookingRow';

interface BookingTableProps {
	bookings: Booking[];
}

function BookingTable({ bookings }: BookingTableProps) {
	return (
		<Table id="bookingTable" caption="Bookings">
			<Table.Head>
				<Table.Row>
					<Table.HeaderCell>Cabin</Table.HeaderCell>
					<Table.HeaderCell>Guest</Table.HeaderCell>
					<Table.HeaderCell>Duration</Table.HeaderCell>
					<Table.HeaderCell>Status</Table.HeaderCell>
					<Table.HeaderCell>Price</Table.HeaderCell>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				{bookings.map(booking => (
					<BookingRow key={booking.id} booking={booking} />
				))}
			</Table.Body>
		</Table>
	);
}

export default BookingTable;
