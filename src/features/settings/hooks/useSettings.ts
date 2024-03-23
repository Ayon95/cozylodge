import { getSettings } from '@/services/apiSettings';
import { SETTINGS_QUERY_KEY } from '@/utils/constants';
import { useQuery } from '@tanstack/react-query';

export function useSettings(userId: string | null | undefined) {
	return useQuery({
		queryKey: [SETTINGS_QUERY_KEY, userId],
		queryFn: () => getSettings(userId),
		staleTime: Infinity,
		cacheTime: Infinity,
	});
}
