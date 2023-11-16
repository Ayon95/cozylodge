import styled, { css } from 'styled-components';

interface ButtonIconTextProps {
	$variant?: 'danger';
}

const ButtonIconText = styled.button<ButtonIconTextProps>`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	border: none;
	font-weight: 500;
	${props =>
		props.$variant === 'danger' &&
		css`
			color: var(--color-red-600);
		`}
`;

export default ButtonIconText;
