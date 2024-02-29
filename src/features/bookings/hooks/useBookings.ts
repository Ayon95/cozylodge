import { getBookings } from '@/services/apiBookings';
import { BOOKINGS_QUERY_KEY } from '@/utils/constants';
import { useQuery } from '@tanstack/react-query';

export function useBookings(userId: string | null | undefined) {
	return useQuery({
		queryKey: [BOOKINGS_QUERY_KEY, userId],
		queryFn: () => getBookings(userId),
		staleTime: Infinity,
		cacheTime: Infinity,
	});
}
