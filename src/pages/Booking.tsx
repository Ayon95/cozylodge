import { useParams } from 'react-router-dom';

import { useBooking } from '@/features/bookings/hooks/useBooking';
import Spinner from '@/ui/spinner/Spinner';
import BookingDetails from '@/features/bookings/BookingDetails';
import { useUser } from '@/features/authentication/hooks/useUser';

type BookingParams = { bookingId: string };

function Booking() {
	const { bookingId } = useParams<BookingParams>();
	const { data: user } = useUser();
	const { data: booking, isLoading, isError, error } = useBooking(bookingId, user?.id);

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : isError && error instanceof Error ? (
				<h1>{error.message}</h1>
			) : !booking ? (
				<h1>Booking could not be found.</h1>
			) : (
				<BookingDetails booking={booking} />
			)}
		</>
	);
}

export default Booking;
