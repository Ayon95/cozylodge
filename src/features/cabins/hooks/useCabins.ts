import { getCabins } from '@/services/apiCabins';
import { CABINS_QUERY_KEY } from '@/utils/constants';
import { useQuery } from '@tanstack/react-query';

export function useCabins(userId: string | null | undefined) {
	return useQuery({
		queryKey: [CABINS_QUERY_KEY, userId],
		queryFn: () => getCabins(userId),
	});
}
