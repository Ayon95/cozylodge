import { getBooking } from '@/services/apiBookings';
import { BOOKING_QUERY_KEY } from '@/utils/constants';
import { useQuery } from '@tanstack/react-query';

export function useBooking(bookingId: string | undefined, userId: string | null | undefined) {
	return useQuery({
		queryKey: [BOOKING_QUERY_KEY, bookingId, userId],
		queryFn: () => getBooking(bookingId, userId),
		staleTime: Infinity,
		cacheTime: Infinity,
	});
}
