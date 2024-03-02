import { SortDirection } from '@mswjs/data/lib/query/queryTypes';
import { Tables } from './database';

export type Booking = Pick<
	Tables<'booking'>,
	| 'id'
	| 'created_at'
	| 'start_date'
	| 'end_date'
	| 'num_nights'
	| 'num_guests'
	| 'status'
	| 'total_price'
> & { cabin: Pick<Tables<'cabin'>, 'id' | 'name'> | null } & {
	guest: Pick<Tables<'guest'>, 'id' | 'full_name' | 'email'> | null;
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
