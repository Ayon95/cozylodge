import { useSearchParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getBookings } from '@/services/apiBookings';
import { BOOKINGS_QUERY_KEY, PAGE_SIZE } from '@/utils/constants';
import { BookingFilter, BookingSort, BookingSortableFields } from '@/types/bookings';
import { SortDirection } from '@mswjs/data/lib/query/queryTypes';

export function useBookings(userId: string | null | undefined) {
	const [searchParams] = useSearchParams();
	const queryClient = useQueryClient();

	const filterValue = searchParams.get('status');
	const filter: BookingFilter | null =
		!filterValue || filterValue === 'all' ? null : { field: 'status', value: filterValue };

	const sortValue = searchParams.get('sort');
	let sort: BookingSort | null = null;

	const pageValue = searchParams.get('page');
	const pageNum = pageValue ? Number.parseFloat(pageValue) : 1;

	if (sortValue) {
		const [sortBy, sortDirection] = sortValue.split('-');
		sort = { field: sortBy as BookingSortableFields, direction: sortDirection as SortDirection };
	}

	const { data, error, isError, isLoading } = useQuery({
		queryKey: [BOOKINGS_QUERY_KEY, userId, filter, sort, pageNum],
		queryFn: () => getBookings(userId, { filter, sort, pageNum }),
		staleTime: Infinity,
		cacheTime: Infinity,
	});

	// Prefetching next page if data exists and not on the last page
	if (data) {
		const pageCount = Math.ceil(data.count / PAGE_SIZE);
		if (pageNum < pageCount) {
			queryClient.prefetchQuery({
				queryKey: [BOOKINGS_QUERY_KEY, userId, filter, sort, pageNum + 1],
				queryFn: () => getBookings(userId, { filter, sort, pageNum: pageNum + 1 }),
				staleTime: Infinity,
				cacheTime: Infinity,
			});
		}
	}

	return { data, error, isError, isLoading };
}
