import FlexRow from '@/ui/FlexRow';
import Heading from '../ui/Heading';
import { useUser } from '@/features/authentication/hooks/useUser';
import { useBookings } from '@/features/bookings/hooks/useBookings';
import Spinner from '@/ui/spinner/Spinner';
import BookingTable from '@/features/bookings/BookingTable';
import BookingFilterAndSortControls from '@/features/bookings/BookingFilterAndSortControls';

function Bookings() {
	const { data: user } = useUser();
	const { data: bookings, isLoading } = useBookings(user?.id);

	return (
		<>
			<FlexRow>
				<Heading as="h1">Bookings</Heading>
				<BookingFilterAndSortControls />
			</FlexRow>
			{isLoading ? (
				<Spinner />
			) : bookings && bookings.length > 0 ? (
				<BookingTable bookings={bookings} />
			) : (
				<p className="mt-1">No bookings to show.</p>
			)}
		</>
	);
}

export default Bookings;
