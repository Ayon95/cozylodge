import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

interface ButtonProps {
	$size?: 'small' | 'medium' | 'large';
	$variant?: 'primary' | 'secondary' | 'danger';
}

const sizes = {
	small: css`
		font-size: 1.2rem;
		padding: 0.45rem 0.9rem;
		text-transform: uppercase;
		font-weight: 600;
		text-align: center;
	`,
	medium: css`
		font-size: 1.4rem;
		padding: 1.2rem 1.8rem;
		font-weight: 500;
	`,
	large: css`
		font-size: 1.6rem;
		padding: 1.2rem 2.4rem;
		font-weight: 500;
	`,
};

const variants = {
	primary: css`
		color: var(--color-brand-50);
		background-color: var(--color-brand-500);

		&:hover {
			background-color: var(--color-brand-600);
		}
	`,
	secondary: css`
		color: var(--color-grey-600);
		background-color: var(--color-grey-100);
		border: 1px solid var(--color-grey-200);

		&:hover {
			background-color: var(--color-grey-200);
		}
	`,
	danger: css`
		color: var(--color-red-100);
		background-color: var(--color-red-600);

		&:hover {
			background-color: var(--color-red-700);
		}
	`,
};

const commonButtonStyles = css<ButtonProps>`
	border: none;
	border-radius: var(--border-radius-sm);
	box-shadow: var(--shadow-sm);

	${props => (!props.$size ? sizes['medium'] : sizes[props.$size])}
	${props => (!props.$variant ? variants['primary'] : variants[props.$variant])}
`;

export const Button = styled.button<ButtonProps>`
	${commonButtonStyles}
`;

export const LinkButton = styled(Link)<ButtonProps>`
	${commonButtonStyles}
	display: inline-block;
`;
