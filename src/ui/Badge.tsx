import styled from 'styled-components';

const Badge = styled.div<{ type: string }>`
	width: fit-content;
	padding: 0.4rem 1.2rem;
	border-radius: 10rem;
	font-size: 1.1rem;
	font-weight: 600;
	text-transform: uppercase;

	background-color: var(--color-${props => props.type}-100);
	color: var(--color-${props => props.type}-700);
	border: 1px solid var(--color-${props => props.type}-700);
`;

export default Badge;
