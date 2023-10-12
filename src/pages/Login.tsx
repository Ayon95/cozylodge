import LoginForm from '@/features/authentication/LoginForm';
import { useUser } from '@/features/authentication/hooks/useUser';
import Heading from '@/ui/Heading';
import Logo from '@/ui/Logo';
import RestrictiveContainer from '@/ui/RestrictiveContainer';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';

function Login() {
	const { data: user } = useUser();
	if (user) return <Navigate to="/dashboard" replace />;
	return (
		<StyledMain>
			<RestrictiveContainer $maxWidth="48rem">
				<Logo />
				<StyledHeading as="h1">Log in to your account</StyledHeading>
				<LoginForm />
			</RestrictiveContainer>
		</StyledMain>
	);
}

const StyledMain = styled.main`
	display: grid;
	place-items: center;
	min-height: 100vh;
	min-height: 100svh;
	background-color: var(--color-grey-50);
`;

const StyledHeading = styled(Heading)`
	margin: 2rem 0;
	font-size: 2.6rem;
	text-align: center;
`;

export default Login;
