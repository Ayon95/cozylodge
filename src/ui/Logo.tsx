import styled from 'styled-components';

const Container = styled.div`
	text-align: center;
`;

const Img = styled.img`
	width: 100%;
	max-width: 17rem;
`;

function Logo() {
	return (
		<Container>
			<Img src="/logo-light.png" alt="CozyLodge Logo" />
		</Container>
	);
}

export default Logo;
