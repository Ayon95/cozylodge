import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getBookings } from '@/services/apiBookings';
import { BOOKINGS_QUERY_KEY } from '@/utils/constants';
import { BookingFilter, BookingSort, BookingSortableFields } from '@/types/bookings';
import { SortDirection } from '@mswjs/data/lib/query/queryTypes';

export function useBookings(userId: string | null | undefined) {
	const [searchParams] = useSearchParams();

	const filterValue = searchParams.get('status');
	const filter: BookingFilter | null =
		!filterValue || filterValue === 'all' ? null : { field: 'status', value: filterValue };

	const sortValue = searchParams.get('sort');
	let sort: BookingSort | null = null;

	if (sortValue) {
		const [sortBy, sortDirection] = sortValue.split('-');
		sort = { field: sortBy as BookingSortableFields, direction: sortDirection as SortDirection };
	}

	return useQuery({
		queryKey: [BOOKINGS_QUERY_KEY, userId, filter, sort],
		queryFn: () => getBookings(userId, filter, sort),
		staleTime: Infinity,
		cacheTime: Infinity,
	});
}
