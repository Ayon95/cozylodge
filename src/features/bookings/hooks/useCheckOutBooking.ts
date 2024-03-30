import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateBooking } from '@/services/apiBookings';
import { BOOKINGS_QUERY_KEY, BOOKING_QUERY_KEY } from '@/utils/constants';
import { Tables } from '@/types/database';

export function useCheckOutBooking() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateBooking,
		onSuccess: (data: Tables<'booking'>) => {
			toast.success(`Booking #${data.id} updated successfully!`);
			queryClient.invalidateQueries({ queryKey: [BOOKINGS_QUERY_KEY] });
			queryClient.invalidateQueries({ queryKey: [BOOKING_QUERY_KEY, data.id.toString()] });
		},
		onError: (error: Error) => toast.error(error.message),
	});
}
