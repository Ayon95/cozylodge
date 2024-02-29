import { bookingHandlers } from './domains/bookings';
import { cabinHandlers } from './domains/cabins';

export const handlers = [...cabinHandlers, ...bookingHandlers];
