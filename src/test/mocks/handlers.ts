import { bookingHandlers } from './domains/bookings';
import { cabinHandlers } from './domains/cabins';
import { settingsHandlers } from './domains/settings';

export const handlers = [...cabinHandlers, ...bookingHandlers, ...settingsHandlers];
