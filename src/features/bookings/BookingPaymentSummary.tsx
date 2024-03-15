import { Booking } from '@/types/bookings';
import Badge from '@/ui/Badge';
import Heading from '@/ui/Heading';
import { formatPrice } from '@/utils/helpers';
import styled from 'styled-components';

interface BookingPaymentSummaryProps {
	paymentInfo: Pick<
		Booking,
		'cabin_price' | 'extra_price' | 'total_price' | 'has_breakfast' | 'is_paid'
	>;
}

function BookingPaymentSummary({ paymentInfo }: BookingPaymentSummaryProps) {
	const { cabin_price, extra_price, total_price, has_breakfast, is_paid } = paymentInfo;
	return (
		<section>
			<HeadingContainer>
				<Heading as="h2">Payment Summary</Heading>
				<StyledBadge type={is_paid ? 'brand' : 'red'}>{is_paid ? 'paid' : 'not paid'}</StyledBadge>
			</HeadingContainer>
			<div>
				<PriceItemContainer>
					<PriceItem>
						Cabin: <data value={cabin_price}>{formatPrice(cabin_price)}</data>
					</PriceItem>
				</PriceItemContainer>
				{extra_price && (
					<PriceItemContainer>
						<PriceItem>
							Extra: <data value={extra_price}>{formatPrice(extra_price)}</data>
						</PriceItem>
						{has_breakfast && <PriceItemExtraInfo>Includes breakfast</PriceItemExtraInfo>}
					</PriceItemContainer>
				)}
				<PriceItemContainer>
					<PriceItem>
						<strong>Total:</strong>{' '}
						<strong>
							<data value={total_price}>{formatPrice(total_price)}</data>
						</strong>
					</PriceItem>
				</PriceItemContainer>
			</div>
		</section>
	);
}

export default BookingPaymentSummary;

const HeadingContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1rem;
	margin-bottom: 1.6rem;
`;

const StyledBadge = styled(Badge)`
	flex-shrink: 0;
	transform: translateY(3px);
`;

const PriceItemContainer = styled.div`
	font-size: calc(var(--fontSize-base) + 0.2rem);
	&:not(:last-child) {
		margin-bottom: 1.2rem;
	}
`;

const PriceItem = styled.p`
	display: flex;
	justify-content: space-between;
	gap: 1rem;

	data {
		font-family: var(--fontFamily-numeric);
	}
`;

const PriceItemExtraInfo = styled.p`
	font-size: 1.3rem;
	font-weight: 600;
	color: var(--color-brand-600);
`;
