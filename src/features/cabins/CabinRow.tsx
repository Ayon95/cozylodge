import styled from 'styled-components';

import { formatPrice } from '@/utils/helpers';
import { Tables } from '@/types/database';
import ButtonIconText from '@/ui/button/ButtonIconText';
import { HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';

interface CabinRowProps {
	cabin: Tables<'cabin'>;
	onClickUpdate: (cabin: Tables<'cabin'>) => void;
	onClickDelete: (cabin: Tables<'cabin'>) => void;
}

function CabinRow({ cabin, onClickUpdate, onClickDelete }: CabinRowProps) {
	const { name, description, max_capacity, regular_price, discount, image_url } = cabin;
	return (
		<StyledTableRow role="row">
			<td role="cell">
				<Img src={`${image_url}?q=${Date.now()}`} alt={`${name}, ${description}`} />
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
			<td role="cell">
				<ActionButtonsContainer>
					<ButtonIconText type="button" aria-haspopup="dialog" onClick={() => onClickUpdate(cabin)}>
						<HiOutlinePencilSquare aria-hidden="true" />
						<span>Update</span>
					</ButtonIconText>
					<ButtonIconText
						type="button"
						aria-haspopup="dialog"
						$variant="danger"
						onClick={() => onClickDelete(cabin)}
					>
						<HiOutlineTrash aria-hidden="true" />
						<span>Delete</span>
					</ButtonIconText>
				</ActionButtonsContainer>
			</td>
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

const ActionButtonsContainer = styled.div`
	display: flex;
	gap: 12px;
`;

const Cabin = styled(AlternateFontCell)`
	color: var(--color-grey-600);
`;

const Discount = styled(AlternateFontCell)`
	color: var(--color-green-700);
`;
