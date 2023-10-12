import { logout } from '@/services/apiAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export function useLogout() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const logoutMutation = useMutation({
		mutationFn: logout,
		onSuccess: () => {
			queryClient.removeQueries();
			navigate('/login', { replace: true });
		},
	});

	return logoutMutation;
}
