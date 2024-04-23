import { useState } from 'react';

import { Booking } from '@/types/bookings';
import Table from '@/ui/Table';
import BookingRow from './BookingRow';
import useModal from '@/hooks/useModal';
import { useDeleteBooking } from './hooks/useDeleteBooking';
import ConfirmDeleteModal from '@/ui/Modal/ConfirmDeleteModal';

interface BookingTableProps {
	bookings: Booking[];
}

function BookingTable({ bookings }: BookingTableProps) {
	const [selectedBooking, setSelectedBooking] = useState<null | Booking>(null);

	const deleteBookingMutation = useDeleteBooking();

	const {
		shouldShowModal: shouldShowConfirmDeleteModal,
		openModal: openConfirmDeleteModal,
		closeModal: closeConfirmDeleteModal,
	} = useModal();

	function showConfirmDeleteModalForSelectedBooking(booking: Booking) {
		setSelectedBooking(booking);
		openConfirmDeleteModal();
	}

	function closeConfirmDeleteModalForSelectedBooking() {
		setSelectedBooking(null);
		closeConfirmDeleteModal();
	}

	function deleteSelectedBooking() {
		if (selectedBooking) {
			deleteBookingMutation.mutate(selectedBooking.id);
			closeConfirmDeleteModalForSelectedBooking();
		}
	}

	return (
		<>
			<Table id="bookingTable" caption="Bookings">
				<Table.Head>
					<Table.Row>
						<Table.HeaderCell>Cabin</Table.HeaderCell>
						<Table.HeaderCell>Guest</Table.HeaderCell>
						<Table.HeaderCell>Duration</Table.HeaderCell>
						<Table.HeaderCell>Status</Table.HeaderCell>
						<Table.HeaderCell>Price</Table.HeaderCell>
						<Table.HeaderCell>
							<span className="sr-only">Actions</span>
						</Table.HeaderCell>
					</Table.Row>
				</Table.Head>
				<Table.Body>
					{bookings.map(booking => (
						<BookingRow
							key={booking.id}
							booking={booking}
							onClickDelete={showConfirmDeleteModalForSelectedBooking}
						/>
					))}
				</Table.Body>
			</Table>
			{selectedBooking && shouldShowConfirmDeleteModal && (
				<ConfirmDeleteModal
					resourceName={`booking ${selectedBooking.id}`}
					onConfirmDelete={deleteSelectedBooking}
					onCloseModal={closeConfirmDeleteModalForSelectedBooking}
					isDeleting={deleteBookingMutation.isLoading}
				/>
			)}
		</>
	);
}

export default BookingTable;
