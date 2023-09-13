import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { styled } from 'styled-components';

export default function AppLayout() {
	return (
		<Container>
			<Header />
			<Sidebar />
			<Main>
				<Outlet />
			</Main>
		</Container>
	);
}

const Container = styled.div`
	display: grid;
	grid-template-columns: 26rem 1fr;
	grid-template-rows: auto 1fr;
	min-height: 100svh;
	min-height: 100vh;
`;

const Main = styled.main`
	padding: 4rem 4.8rem 6.4rem;
	background-color: var(--color-grey-50);
`;
