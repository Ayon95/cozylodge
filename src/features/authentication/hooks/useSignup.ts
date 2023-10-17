import { signup } from '@/services/apiAuth';
import { AuthError } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useSignup() {
	const navigate = useNavigate();
	const signupMutation = useMutation({
		mutationFn: signup,
		onSuccess: () => navigate('/dashboard', { replace: true }),
		onError: (error: AuthError) => toast.error(error.message),
	});

	return signupMutation;
}
