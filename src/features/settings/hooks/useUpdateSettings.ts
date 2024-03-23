import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateSettings } from '@/services/apiSettings';
import { SETTINGS_QUERY_KEY } from '@/utils/constants';

export function useUpdateSettings() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateSettings,
		onSuccess: () => {
			toast.success('Settings updated successfully!');
			queryClient.invalidateQueries({ queryKey: [SETTINGS_QUERY_KEY] });
		},
		onError: (error: Error) => toast.error(error.message),
	});
}
