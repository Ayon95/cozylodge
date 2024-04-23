import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { deleteBooking } from '@/services/apiBookings';
import { BOOKINGS_QUERY_KEY } from '@/utils/constants';
import { useLocation, useNavigate } from 'react-router-dom';

export function useDeleteBooking() {
	const location = useLocation();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteBooking,
		onSuccess: () => {
			toast.success('Booking deleted successfully!');
			queryClient.invalidateQueries({ queryKey: [BOOKINGS_QUERY_KEY] });
			if (location.pathname.includes('bookings/')) {
				setTimeout(() => {
					navigate('/bookings', { replace: true });
				}, 1000);
			}
		},
		onError: (error: Error) => toast.error(error.message),
	});
}
