import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { createCabin } from '@/services/apiCabins';
import { CABINS_QUERY_KEY } from '@/utils/constants';

export function useCreateCabin() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createCabin,
		onSuccess: () => {
			toast.success('Cabin created successfully!');
			queryClient.invalidateQueries({ queryKey: [CABINS_QUERY_KEY] });
		},
		onError: (error: Error) => toast.error(error.message),
	});
}
