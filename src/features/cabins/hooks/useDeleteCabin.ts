import { deleteCabin } from '@/services/apiCabins';
import { CABINS_QUERY_KEY } from '@/utils/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useDeleteCabin() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteCabin,
		onSuccess: () => {
			toast.success('Cabin deleted successfully!');
			queryClient.invalidateQueries({ queryKey: [CABINS_QUERY_KEY] });
		},
		onError: (error: Error) => toast.error(error.message),
	});
}
