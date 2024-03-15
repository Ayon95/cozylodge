import styled from 'styled-components';

import { Booking } from '@/types/bookings';
import Table from '@/ui/Table';

interface BookingGuestDetailsTableProps {
	guestDetails: Pick<Booking, 'num_guests' | 'guest'>;
}

function BookingGuestDetailsTable({ guestDetails }: BookingGuestDetailsTableProps) {
	const { num_guests, guest } = guestDetails;

	if (!guest) return null;

	return (
		<StyledTable id="guestDetailsTable" caption="Guest Details">
			<Table.Head>
				<Table.Row>
					<Table.HeaderCell>Name</Table.HeaderCell>
					<Table.HeaderCell>Email</Table.HeaderCell>
					<Table.HeaderCell>Total Guests</Table.HeaderCell>
					<Table.HeaderCell>Country</Table.HeaderCell>
					<Table.HeaderCell>National ID</Table.HeaderCell>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				<Table.Row>
					<Table.Cell label="name" className="fw-semi-bold">
						{guest.full_name}
					</Table.Cell>
					<Table.Cell label="email">{guest.email}</Table.Cell>
					<NumericTextCell label="total guests">{num_guests}</NumericTextCell>
					<Table.Cell label="country">
						<CountryDetails>
							{guest.country_flag && <Flag src={guest.country_flag} />}
							{guest.nationality && <span>{guest.nationality}</span>}
						</CountryDetails>
					</Table.Cell>
					<NumericTextCell label="national ID">{guest.national_id ?? '-'}</NumericTextCell>
				</Table.Row>
			</Table.Body>
		</StyledTable>
	);
}

export default BookingGuestDetailsTable;

const StyledTable = styled(Table)`
	th,
	td {
		padding: 0.5rem;
	}

	td img {
		border-radius: var(--border-radius-tiny);
	}
`;

const Flag = styled.img`
	width: 3rem;
	border-radius: var(--border-radius-tiny);
`;

const CountryDetails = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
`;

const NumericTextCell = styled(Table.Cell)`
	font-family: var(--fontFamily-numeric);
	font-size: 1.5rem;
`;
