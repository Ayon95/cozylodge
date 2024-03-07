import { useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

interface FilterProps<Field> {
	options: { label: string; value: string }[];
	field: Field;
}

export default function Filter<Field extends string>({ options, field }: FilterProps<Field>) {
	const [searchParams, setSearchParams] = useSearchParams();
	const currentFilter = searchParams.get(field);

	function setFilterSearchParam(filterValue: string) {
		// Reset page query param if it exists
		if (searchParams.get('page')) searchParams.set('page', '1');

		searchParams.set(field, filterValue);
		setSearchParams(searchParams);
	}

	function removeFilterSearchParam() {
		if (searchParams.get('page')) searchParams.set('page', '1');

		searchParams.delete(field);
		setSearchParams(searchParams);
	}

	return (
		<FilterButtonsContainer>
			<FilterButton
				type="button"
				onClick={removeFilterSearchParam}
				$active={!currentFilter}
				disabled={!currentFilter}
			>
				All
			</FilterButton>
			{options.map(option => (
				<FilterButton
					type="button"
					key={option.value}
					onClick={() => setFilterSearchParam(option.value)}
					disabled={currentFilter === option.value}
					$active={currentFilter === option.value}
				>
					{option.label}
				</FilterButton>
			))}
		</FilterButtonsContainer>
	);
}

const FilterButtonsContainer = styled.div`
	border: 1px solid var(--color-grey-100);
	background-color: var(--color-grey-0);
	box-shadow: var(--shadow-sm);
	border-radius: var(--border-radius-sm);
	padding: 0.4rem;
	display: flex;
	gap: 0.4rem;
`;

const filterButtonActiveStyles = css`
	background-color: var(--color-brand-600);
	color: var(--color-brand-50);
`;

const FilterButton = styled.button<{
	$active?: boolean;
}>`
	background-color: var(--color-grey-0);
	border: none;

	${props => props.$active && filterButtonActiveStyles}

	border-radius: var(--border-radius-sm);
	font-weight: 500;
	font-size: 1.4rem;
	/* To give the same height as select */
	padding: 0.44rem 0.8rem;
	transition:
		background-color 0.3s,
		color 0.3s;

	&:hover:not(:disabled) {
		${filterButtonActiveStyles}
	}
`;
