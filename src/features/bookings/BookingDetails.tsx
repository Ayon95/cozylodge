import styled from 'styled-components';
import { HiArrowLeft, HiOutlineHomeModern } from 'react-icons/hi2';

import Heading from '@/ui/Heading';
import { LinkButtonIconText } from '@/ui/button/ButtonIconText';
import Badge from '@/ui/Badge';
import { bookingStatusToBadgeColorMap } from '@/utils/constants';
import { Booking, BookingStatus } from '@/types/bookings';
import { formatDate } from '@/utils/helpers';
import BookingGuestDetailsTable from './BookingGuestDetailsTable';
import BookingPaymentSummary from './BookingPaymentSummary';
import { Button } from '@/ui/button/Button';
import { useCheckOutBooking } from './hooks/useCheckOutBooking';
import SpinnerMini from '@/ui/spinner/SpinnerMini';
import useModal from '@/hooks/useModal';
import ConfirmDeleteModal from '@/ui/Modal/ConfirmDeleteModal';
import { useDeleteBooking } from './hooks/useDeleteBooking';

interface BookingProps {
	booking: Booking;
}

const dateFormatOptions: Intl.DateTimeFormatOptions = {
	weekday: 'short',
	month: 'short',
	day: '2-digit',
	year: 'numeric',
};

function BookingDetails({ booking }: BookingProps) {
	const {
		shouldShowModal: shouldShowConfirmDeleteModal,
		openModal: openConfirmDeleteModal,
		closeModal: closeConfirmDeleteModal,
	} = useModal();

	const deleteBookingMutation = useDeleteBooking();
	const checkOutBookingMutation = useCheckOutBooking();

	return (
		<>
			<Container>
				<Header>
					<HeadingContainer>
						<Heading as="h1">Booking #{booking.id}</Heading>
						<StyledBadge type={bookingStatusToBadgeColorMap[booking.status as BookingStatus]}>
							{booking.status}
						</StyledBadge>
					</HeadingContainer>
					<LinkButtonIconText to="/bookings">
						<HiArrowLeft />
						<span>Bookings</span>
					</LinkButtonIconText>
				</Header>
				<BookingDate className="text-sm">
					Booked on{' '}
					<time dateTime={booking.created_at}>
						{formatDate(booking.created_at, dateFormatOptions)}
					</time>
				</BookingDate>
				<Grid>
					<div>
						<BookingDurationDetails>
							<div>
								<HiOutlineHomeModern />
								<p>
									<span className="fw-semi-bold">{booking.num_nights}</span>{' '}
									{booking.num_nights > 1 ? 'nights' : 'night'} in{' '}
									<span className="fw-semi-bold">Cabin {booking.cabin?.name}</span>
								</p>
							</div>
							<div>
								<p>Check-in</p>
								<time dateTime={booking.start_date} className="fw-semi-bold">
									{formatDate(booking.start_date, dateFormatOptions)}
								</time>
							</div>
							<div>
								<p>Check-out</p>
								<time dateTime={booking.end_date} className="fw-semi-bold">
									{formatDate(booking.end_date, dateFormatOptions)}
								</time>
							</div>
						</BookingDurationDetails>
						{booking.guest && (
							<Section>
								<Heading as="h2">Guest Details</Heading>
								<BookingGuestDetailsTable
									guestDetails={{ num_guests: booking.num_guests, guest: booking.guest }}
								/>
							</Section>
						)}
						{booking.observations && (
							<Observations>
								<Heading as="h2">Observations & Requests</Heading>
								<p>{booking.observations}</p>
							</Observations>
						)}
					</div>

					<BookingPaymentSummary
						paymentInfo={{
							cabin_price: booking.cabin_price,
							extra_price: booking.extra_price,
							total_price: booking.total_price,
							has_breakfast: booking.has_breakfast,
							is_paid: booking.is_paid,
						}}
					/>
				</Grid>
				<ButtonsContainer>
					{booking.status === 'checked-in' && (
						<Button
							onClick={() =>
								checkOutBookingMutation.mutate({
									bookingId: booking.id,
									updatedData: { status: 'checked-out' },
								})
							}
							disabled={checkOutBookingMutation.isLoading}
						>
							{checkOutBookingMutation.isLoading ? <SpinnerMini /> : 'Check Out'}
						</Button>
					)}
					<Button $variant="danger" onClick={openConfirmDeleteModal}>
						Delete
					</Button>
				</ButtonsContainer>
			</Container>
			{shouldShowConfirmDeleteModal && (
				<ConfirmDeleteModal
					resourceName={`booking ${booking.id}`}
					onConfirmDelete={() => deleteBookingMutation.mutate(booking.id)}
					onCloseModal={closeConfirmDeleteModal}
					isDeleting={deleteBookingMutation.isLoading}
				/>
			)}
		</>
	);
}

export default BookingDetails;

const Container = styled.div`
	--section-spacing: 4rem;
`;

const Header = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	gap: 1rem;
	margin-bottom: 0.6rem;
`;

const HeadingContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 1.6rem;
`;

const BookingDate = styled.p`
	margin-bottom: 4rem;
`;

const StyledBadge = styled(Badge)`
	transform: translateY(3px);
`;

const Grid = styled.div`
	display: grid;
	row-gap: var(--section-spacing);
	column-gap: 3rem;

	@media only screen and (min-width: 75em) {
		grid-template-columns: 2.4fr 1fr;
	}
`;

const Section = styled.section`
	margin-top: var(--section-spacing);

	h2 {
		margin-bottom: 4px;
	}
`;

const BookingDurationDetails = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
	align-items: center;
	gap: 2rem;
	padding: 2rem;
	border-radius: var(--border-radius-sm);
	text-align: center;
	background-color: var(--color-brand-100);

	svg {
		width: 2.2rem;
		height: 2.2rem;
	}
`;

const Observations = styled(Section)`
	p {
		max-width: 75ch;
	}
`;

const ButtonsContainer = styled.div`
	margin-top: 3rem;
	display: flex;
	gap: 10px;
`;
