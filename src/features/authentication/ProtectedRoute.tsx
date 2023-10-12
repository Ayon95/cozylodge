import styled from 'styled-components';
import { useUser } from './hooks/useUser';
import Spinner from '@/ui/spinner/Spinner';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const { data: user, isLoading } = useUser();

	if (isLoading) {
		return (
			<FullPageContainer>
				<Spinner />
			</FullPageContainer>
		);
	}

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	return children;
}

const FullPageContainer = styled.div`
	min-height: 100vh;
	min-height: 100svh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default ProtectedRoute;
