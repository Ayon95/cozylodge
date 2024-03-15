import styled from 'styled-components';

import { formatPrice } from '@/utils/helpers';
import { Tables } from '@/types/database';
import { ButtonIconText } from '@/ui/button/ButtonIconText';
import { HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';
import Table from '@/ui/Table';

interface CabinRowProps {
	cabin: Tables<'cabin'>;
	onClickUpdate: (cabin: Tables<'cabin'>) => void;
	onClickDelete: (cabin: Tables<'cabin'>) => void;
}

function CabinRow({ cabin, onClickUpdate, onClickDelete }: CabinRowProps) {
	const { name, description, max_capacity, regular_price, discount, image_url } = cabin;
	return (
		<Table.Row>
			<Table.Cell>
				<Img src={`${image_url}?q=${Date.now()}`} alt={`${name}, ${description}`} />
			</Table.Cell>
			<CabinCell label="cabin">{name}</CabinCell>
			<Table.Cell label="capacity">{max_capacity}</Table.Cell>
			<AlternateFontCell label="price">{formatPrice(regular_price)}</AlternateFontCell>
			<DiscountCell label="discount">{discount ? formatPrice(discount) : '—'}</DiscountCell>
			<Table.Cell>
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
			</Table.Cell>
		</Table.Row>
	);
}

export default CabinRow;

const AlternateFontCell = styled(Table.Cell)`
	font-family: var(--fontFamily-numeric);
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

const CabinCell = styled(AlternateFontCell)`
	color: var(--color-grey-600);
`;

const DiscountCell = styled(AlternateFontCell)`
	color: var(--color-green-700);
`;
