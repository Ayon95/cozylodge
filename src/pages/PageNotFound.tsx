import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Heading from '@/ui/Heading';
import { Button } from '@/ui/button/Button';

const StyledPageNotFound = styled.main`
	height: 100vh;
	height: 100svh;
	background-color: var(--color-grey-50);
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 4.8rem;
`;

const Box = styled.div`
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);

	padding: 4.8rem;
	flex: 0 1 96rem;
	text-align: center;

	& h1 {
		margin-bottom: 3.2rem;
	}
`;

function PageNotFound() {
	const navigate = useNavigate();

	return (
		<StyledPageNotFound>
			<Box>
				<Heading as="h1">The page you are looking for could not be found 😢</Heading>
				<Button onClick={() => navigate(-1)} size="large">
					&larr; Go back
				</Button>
			</Box>
		</StyledPageNotFound>
	);
}

export default PageNotFound;
