import { Link } from 'react-router-dom';
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

const commonButtonStyles = css<ButtonIconTextProps>`
	display: flex;
	align-items: center;
	gap: 5px;
	padding: 5px;
	border: none;
	background-color: transparent;
	font-weight: 500;
	${props => (!props.$variant ? variants['secondary'] : variants[props.$variant])}
`;

export const ButtonIconText = styled.button<ButtonIconTextProps>`
	${commonButtonStyles}
`;

export const LinkButtonIconText = styled(Link)<ButtonIconTextProps>`
	${commonButtonStyles}
`;
