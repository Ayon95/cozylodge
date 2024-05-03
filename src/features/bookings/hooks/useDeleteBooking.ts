import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { deleteBooking } from '@/services/apiBookings';
import { BOOKINGS_QUERY_KEY } from '@/utils/constants';

export function useDeleteBooking() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteBooking,
		onSuccess: () => {
			toast.success('Booking deleted successfully!');
			queryClient.invalidateQueries({ queryKey: [BOOKINGS_QUERY_KEY] });
		},
		onError: (error: Error) => toast.error(error.message),
	});
}
