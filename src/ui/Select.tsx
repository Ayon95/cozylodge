import styled from 'styled-components';

interface SelectProps extends React.ComponentPropsWithoutRef<'select'> {
	options: { label: string; value: string }[];
	placeholder: string;
}

function Select({ options, placeholder, ...props }: SelectProps) {
	return (
		<StyledSelect {...props}>
			<option value="">{placeholder}</option>
			{options.map(option => (
				<option value={option.value} key={option.value}>
					{option.label}
				</option>
			))}
		</StyledSelect>
	);
}

export default Select;

const StyledSelect = styled.select<{ $type?: 'white' }>`
	font-size: 1.4rem;
	padding: 0.8rem 1.2rem;
	border: 1px solid
		${props => (props.$type === 'white' ? 'var(--color-grey-100)' : 'var(--color-grey-300)')};
	border-radius: var(--border-radius-sm);
	background-color: var(--color-grey-0);
	font-weight: 500;
	box-shadow: var(--shadow-sm);
`;
