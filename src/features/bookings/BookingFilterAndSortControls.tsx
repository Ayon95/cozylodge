import { BookingFields, BookingSortableFields } from '@/types/bookings';
import { SortDirections } from '@/types/sort';
import Filter from '@/ui/Filter';
import SortDropdown from '@/ui/SortDropdown';
import styled from 'styled-components';

type SortOptions = {
	label: string;
	value: `${BookingSortableFields}-${SortDirections}`;
}[];

const filterOptions = [
	{ label: 'Unconfirmed', value: 'unconfirmed' },
	{ label: 'Checked-in', value: 'checked-in' },
	{ label: 'Checked-out', value: 'checked-out' },
];

const sortOptions: SortOptions = [
	{ label: 'Date (latest to oldest)', value: 'start_date-desc' },
	{ label: 'Date (oldest to latest)', value: 'start_date-asc' },
	{ label: 'Price (highest to lowest)', value: 'total_price-desc' },
	{ label: 'Price (lowest to highest)', value: 'total_price-asc' },
];

function BookingFilterAndSortControls() {
	return (
		<Container>
			<Filter<BookingFields> options={filterOptions} field="status" />
			<SortDropdown options={sortOptions} />
		</Container>
	);
}

export default BookingFilterAndSortControls;

const Container = styled.div`
	& > *:first-child {
		margin-bottom: 1rem;
	}
`;
