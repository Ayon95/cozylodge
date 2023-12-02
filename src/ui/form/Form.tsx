import styled, { css } from 'styled-components';

interface FormProps {
	type?: 'modal';
}

const Form = styled.form<FormProps>`
	${props =>
		props.type !== 'modal' &&
		css`
			padding: 2rem;

			/* Box */
			background-color: var(--color-grey-0);
			border: 1px solid var(--color-grey-100);
			border-radius: var(--border-radius-md);
		`}

	${props =>
		props.type === 'modal' &&
		css`
			width: 89%;
			max-width: 80rem;
		`}
    
  overflow: hidden;

	& > *:not(:last-child) {
		margin-bottom: 2rem;
	}
`;

export default Form;
