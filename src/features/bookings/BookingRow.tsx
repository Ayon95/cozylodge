import styled from 'styled-components';
import { HiEye } from 'react-icons/hi2';

import { Booking, BookingStatus } from '@/types/bookings';
import Table from '@/ui/Table';
import { formatPrice, formatDate } from '@/utils/helpers';
import Badge from '@/ui/Badge';
import { LinkButtonIconText } from '@/ui/button/ButtonIconText';
import { bookingStatusToBadgeColorMap } from '@/utils/constants';

interface BookingRowProps {
	booking: Booking;
}

function BookingRow({ booking }: BookingRowProps) {
	const { cabin, guest, start_date, end_date, num_nights, total_price, status } = booking;
	return (
		<Table.Row>
			<DarkNumericTextCell label="cabin">{cabin?.name}</DarkNumericTextCell>
			<Table.Cell label="guest">
				<div>
					<div className="fw-semi-bold">{guest?.full_name}</div>
					<div>{guest?.email}</div>
				</div>
			</Table.Cell>
			<Table.Cell label="duration">
				<div>
					<div className="fw-semi-bold">{num_nights} night stay</div>
					{formatDate(start_date)} - {formatDate(end_date)}
				</div>
			</Table.Cell>
			<Table.Cell label="status">
				<Badge type={bookingStatusToBadgeColorMap[status as BookingStatus]}>{status}</Badge>
			</Table.Cell>
			<DarkNumericTextCell label="price">{formatPrice(total_price)}</DarkNumericTextCell>
			<Table.Cell>
				<ActionButtonsContainer>
					<LinkButtonIconText to={`/bookings/${booking.id}`}>
						<HiEye />
						<span>Details</span>
					</LinkButtonIconText>
				</ActionButtonsContainer>
			</Table.Cell>
		</Table.Row>
	);
}

export default BookingRow;

const DarkNumericTextCell = styled(Table.Cell)`
	font-family: var(--fontFamily-numeric);
	color: var(--color-grey-600);
`;

const ActionButtonsContainer = styled.div`
	display: flex;
	gap: 12px;
`;
