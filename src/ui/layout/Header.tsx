import Logout from '@/features/authentication/Logout';
import { styled } from 'styled-components';

export default function Header() {
	return (
		<HeaderStyled>
			<span>Header</span>
			<Logout />
		</HeaderStyled>
	);
}

const HeaderStyled = styled.header`
	padding: 1.2rem 4.8rem;
	background-color: var(--color-grey-0);
	border-bottom: 1px solid var(--color-grey-100);
	display: flex;
	justify-content: space-between;
`;
