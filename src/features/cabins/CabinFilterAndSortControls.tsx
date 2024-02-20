import styled from 'styled-components';

import Filter from '@/ui/Filter';
import SortDropdown from '@/ui/SortDropdown';
import { CabinFields } from '@/types/cabins';
import { SortDirections } from '@/types/sort';

type SortOptions = {
	label: string;
	value: `${CabinFields}-${SortDirections}`;
}[];

const filterOptions = [
	{ label: 'Discount', value: 'true' },
	{ label: 'No discount', value: 'false' },
];

const sortOptions: SortOptions = [
	{
		label: 'Name (A-Z)',
		value: 'name-asc',
	},
	{
		label: 'Name (Z-A)',
		value: 'name-desc',
	},
	{
		label: 'Price (lowest to highest)',
		value: 'regular_price-asc',
	},
	{
		label: 'Price (highest to lowest)',
		value: 'regular_price-desc',
	},
	{
		label: 'Max capacity (lowest to highest)',
		value: 'max_capacity-asc',
	},
	{
		label: 'Max capacity (highest to lowest)',
		value: 'max_capacity-desc',
	},
];

function CabinFilterAndSortControls() {
	return (
		<Container>
			<Filter<CabinFields> options={filterOptions} field="discount" />
			<SortDropdown options={sortOptions} />
		</Container>
	);
}

export default CabinFilterAndSortControls;

const Container = styled.div`
	& > *:first-child {
		margin-bottom: 1rem;
	}
`;
