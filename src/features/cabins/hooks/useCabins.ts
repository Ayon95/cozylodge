import { useUser } from '@/features/authentication/hooks/useUser';
import { getCabins } from '@/services/apiCabins';
import { CABINS_QUERY_KEY } from '@/utils/constants';
import { useQuery } from '@tanstack/react-query';

export function useCabins() {
	const { data: user } = useUser();

	return useQuery({
		queryKey: [CABINS_QUERY_KEY, user?.id],
		queryFn: () => getCabins(user?.id),
	});
}
