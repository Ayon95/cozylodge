import { useQuery } from '@tanstack/react-query';

import { getCurrentUser } from '@/services/apiAuth';
import { ACCESS_TOKEN_EXPIRATION_TIME, USER_QUERY_KEY } from '@/utils/constants';

export function useUser() {
	const result = useQuery({
		queryKey: [USER_QUERY_KEY],
		queryFn: getCurrentUser,
		staleTime: ACCESS_TOKEN_EXPIRATION_TIME,
		cacheTime: ACCESS_TOKEN_EXPIRATION_TIME + 5 * 60 * 1000,
	});
	return result;
}
