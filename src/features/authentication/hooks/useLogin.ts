import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { login } from '@/services/apiAuth';
import { USER_QUERY_KEY } from '@/utils/constants';
import { AuthError } from '@supabase/supabase-js';

export function useLogin() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const loginMutation = useMutation({
		mutationFn: login,
		onSuccess: async () => {
			queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
			navigate('/dashboard', { replace: true });
		},
		onError: (error: AuthError) => {
			toast.error(error.message);
		},
	});

	return loginMutation;
}
