import styled from 'styled-components';
import { Navigate } from 'react-router-dom';

import Logo from '../Logo';
import RestrictiveContainer from '../RestrictiveContainer';
import { useUser } from '@/features/authentication/hooks/useUser';

function AuthLayout({ children }: { children: React.ReactNode }) {
	const { data: user } = useUser();
	if (user) return <Navigate to="/dashboard" replace />;

	return (
		<StyledMain>
			<RestrictiveContainer $maxWidth="48rem">
				<Logo />
				{children}
			</RestrictiveContainer>
		</StyledMain>
	);
}

export default AuthLayout;

const StyledMain = styled.main`
	display: grid;
	place-items: center;
	min-height: 100vh;
	min-height: 100svh;
	background-color: var(--color-grey-50);

	& h1 {
		margin: 2rem 0;
		font-size: 2.6rem;
		text-align: center;
	}
`;
