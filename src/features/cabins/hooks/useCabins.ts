import { useUser } from '@/features/authentication/hooks/useUser';
import { getCabins } from '@/services/apiCabins';
import { useQuery } from '@tanstack/react-query';

export function useCabins() {
	const { data: user } = useUser();

	return useQuery({
		queryKey: ['cabins', user?.id],
		queryFn: () => getCabins(user?.id),
	});
}
