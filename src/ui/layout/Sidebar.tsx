import { styled } from 'styled-components';
import Logo from '@/ui/Logo';
import MainNav from '@/ui/layout/MainNav';

export default function Sidebar() {
	return (
		<Container>
			<Logo />
			<MainNav />
		</Container>
	);
}

const Container = styled.div`
	grid-row: 1/-1;
	padding: 3.2rem 2.4rem;
	border-right: 1px solid var(--color-grey-100);
	background-color: var(--color-grey-0);
`;
