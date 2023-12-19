import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateCabin } from '@/services/apiCabins';
import { CABINS_QUERY_KEY } from '@/utils/constants';

export function useUpdateCabin() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateCabin,
		onSuccess: () => {
			toast.success('Cabin updated successfully!');
			queryClient.invalidateQueries({ queryKey: [CABINS_QUERY_KEY] });
		},
		onError: (error: Error) => toast.error(error.message),
	});
}
