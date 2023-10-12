import { getCurrentUser } from '@/services/apiAuth';
import { USER_QUERY_KEY } from '@/utils/constants';
import { useQuery } from '@tanstack/react-query';

export function useUser() {
	const result = useQuery({ queryKey: [USER_QUERY_KEY], queryFn: getCurrentUser });
	return result;
}
