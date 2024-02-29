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

export type BookingStatus = 'unconfirmed' | 'checked-in' | 'checked-out';
