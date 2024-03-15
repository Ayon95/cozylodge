import { SortDirection } from '@mswjs/data/lib/query/queryTypes';
import { Tables } from './database';

export type Booking = Omit<Tables<'booking'>, 'cabin_id' | 'guest_id'> & {
	cabin: Pick<Tables<'cabin'>, 'id' | 'name'> | null;
} & {
	guest: Tables<'guest'> | null;
};

export type BookingFields = keyof Booking;

export type BookingFilter = {
	field: BookingFields;
	value: string;
	comparisonMethod?: 'eq' | 'gt' | 'gte' | 'lt' | 'lte';
};

export type BookingSortableFields = keyof Pick<Booking, 'start_date' | 'total_price'>;

export type BookingSort = {
	field: BookingSortableFields;
	direction: SortDirection;
};

export type BookingStatus = 'unconfirmed' | 'checked-in' | 'checked-out';
