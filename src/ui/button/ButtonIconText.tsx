import styled, { css } from 'styled-components';

interface ButtonIconTextProps {
	$variant?: 'secondary' | 'danger';
}

const variants = {
	secondary: css`
		color: var(--font-color-btn-secondary);
	`,
	danger: css`
		color: var(--color-btn-danger);
	`,
};

const ButtonIconText = styled.button<ButtonIconTextProps>`
	display: flex;
	align-items: center;
	gap: 5px;
	padding: 5px;
	border: none;
	background-color: transparent;
	font-weight: 500;
	${props => (!props.$variant ? variants['secondary'] : variants[props.$variant])}
`;

export default ButtonIconText;
