import { login } from '@/services/apiAuth';
import { AuthError } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
	const navigate = useNavigate();

	const loginMutation = useMutation({
		mutationFn: login,
		onSuccess: () => navigate('/dashboard', { replace: true }),
		onError: (error: AuthError) => {
			toast.error(error.message);
		},
	});

	return loginMutation;
}
