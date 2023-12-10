import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import {
	HiOutlineSquares2X2,
	HiOutlineCalendarDays,
	HiOutlineHomeModern,
	HiOutlineCog8Tooth,
} from 'react-icons/hi2';

export default function MainNav() {
	return (
		<Nav>
			<NavList>
				<li>
					<StyledNavLink to="/dashboard">
						<HiOutlineSquares2X2 />
						Overview
					</StyledNavLink>
				</li>
				<li>
					<StyledNavLink to="/bookings">
						<HiOutlineCalendarDays />
						Bookings
					</StyledNavLink>
				</li>
				<li>
					<StyledNavLink to="/cabins">
						<HiOutlineHomeModern />
						Cabins
					</StyledNavLink>
				</li>
				<li>
					<StyledNavLink to="/settings">
						<HiOutlineCog8Tooth />
						Settings
					</StyledNavLink>
				</li>
			</NavList>
		</Nav>
	);
}

const Nav = styled.nav`
	margin-top: 3.2rem;
`;

const NavList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
	--transition-duration: 0.2s;
	&:link,
	&:visited {
		display: flex;
		align-items: center;
		gap: 1.2rem;

		color: var(--color-grey-600);
		font-size: 1.6rem;
		font-weight: 600;
		padding: 1.2rem 2.4rem;
		border-radius: var(--border-radius-sm);
		transition:
			color var(--transition-duration),
			background-color var(--transition-duration);
	}

	/* This works because react-router places the active class on the active NavLink */
	&:hover,
	&:active,
	&.active:link,
	&.active:visited {
		color: var(--color-brand-600);
		background-color: var(--color-brand-100);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		transition: color var(--transition-duration);
	}

	&:hover svg,
	&:active svg,
	&.active:link svg,
	&.active:visited svg {
		color: var(--color-brand-600);
	}
`;
