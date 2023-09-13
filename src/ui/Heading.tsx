import { css, styled } from 'styled-components';

const Heading = styled.h1`
	${props => {
		if (props.as === 'h1') {
			return css`
				font-size: 3.2rem;
			`;
		}
		if (props.as === 'h2') {
			return css`
				font-size: 2.6rem;
			`;
		}
		if (props.as === 'h3') {
			return css`
				font-size: 2.2rem;
			`;
		}
	}}

	font-weight: 700;
	line-height: 1.4;
`;

export default Heading;
