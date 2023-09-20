import styled from 'styled-components';

import { formatPrice } from '@/utils/helpers';
import { Tables } from '@/types/database';

interface TableRowProps {
	cabin: Tables<'cabin'>;
}

function CabinRow({ cabin }: TableRowProps) {
	const { name, description, max_capacity, regular_price, discount, image_url } = cabin;
	return (
		<StyledTableRow role="row">
			<td role="cell">
				<Img src={image_url} alt={description} />
			</td>
			<Cabin role="cell" data-cell="cabin">
				{name}
			</Cabin>
			<td role="cell" data-cell="capacity">
				{max_capacity}
			</td>
			<AlternateFontCell role="cell" data-cell="price">
				{formatPrice(regular_price)}
			</AlternateFontCell>
			<Discount role="cell" data-cell="discount">
				{discount ? formatPrice(discount) : '—'}
			</Discount>
		</StyledTableRow>
	);
}

export default CabinRow;

const AlternateFontCell = styled.td`
	font-family: 'Sono', monospace;
`;

const StyledTableRow = styled.tr`
	&:nth-child(2n) {
		background-color: var(--color-grey-200);
	}

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}
`;

const Img = styled.img`
	display: block;
	width: 100%;
	object-fit: cover;
	object-position: center;

	@media only screen and (min-width: 62.5em) {
		max-width: 9.2rem;
	}
`;

const Cabin = styled(AlternateFontCell)`
	color: var(--color-grey-600);
`;

const Discount = styled(AlternateFontCell)`
	color: var(--color-green-700);
`;
