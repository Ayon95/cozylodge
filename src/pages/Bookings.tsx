import FlexRow from '@/ui/FlexRow';
import Heading from '../ui/Heading';
import { useUser } from '@/features/authentication/hooks/useUser';
import { useBookings } from '@/features/bookings/hooks/useBookings';
import Spinner from '@/ui/spinner/Spinner';
import BookingTable from '@/features/bookings/BookingTable';
import BookingFilterAndSortControls from '@/features/bookings/BookingFilterAndSortControls';
import Pagination from '@/ui/Pagination';

function Bookings() {
	const { data: user } = useUser();
	const { data: bookingsData, isLoading, isError, error } = useBookings(user?.id);

	return (
		<>
			<FlexRow>
				<Heading as="h1">Bookings</Heading>
				<BookingFilterAndSortControls />
			</FlexRow>
			{isLoading ? (
				<Spinner />
			) : isError && error instanceof Error ? (
				<p className="mt-1">{error.message}</p>
			) : bookingsData && bookingsData.count > 0 ? (
				<>
					<BookingTable bookings={bookingsData.bookings} />
					<Pagination totalCount={bookingsData.count} />
				</>
			) : (
				<p className="mt-1">No bookings to show.</p>
			)}
		</>
	);
}

export default Bookings;
