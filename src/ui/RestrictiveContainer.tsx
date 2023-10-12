import styled from 'styled-components';

interface RestrictiveContainerProps {
	$maxWidth: string;
}

const RestrictiveContainer = styled.div<RestrictiveContainerProps>`
	width: 89%;
	max-width: ${props => props.$maxWidth};
	margin-left: auto;
	margin-right: auto;
`;

export default RestrictiveContainer;
