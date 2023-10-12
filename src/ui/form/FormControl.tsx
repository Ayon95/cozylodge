import styled from 'styled-components';

interface FormControlProps {
	labelInfo?: {
		label: string;
		inputId: string;
	};
	error?: string;
	children: React.ReactNode;
}

function FormControl({ labelInfo, error, children }: FormControlProps) {
	return (
		<Container>
			{labelInfo && <Label htmlFor={labelInfo.inputId}>{labelInfo.label}</Label>}
			{children}
			{error && <Error role="alert">{error}</Error>}
		</Container>
	);
}

const Container = styled.div`
	display: grid;
	gap: 0.8rem;

	&:not(:last-child) {
		margin-bottom: 2rem;
	}
`;

const Label = styled.label`
	font-weight: 600;
`;

const Error = styled.p`
	font-size: 1.3rem;
	color: var(--color-red-600);
`;

export default FormControl;
