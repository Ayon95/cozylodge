import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Filter from '../Filter';

const filterOptions = [
	{ label: 'Discount', value: 'true' },
	{ label: 'No discount', value: 'false' },
];
const filterField = 'discount';

it('should show a button to reset filter', () => {
	render(
		<MemoryRouter>
			<Filter<'discount'> options={filterOptions} field={filterField} />
		</MemoryRouter>
	);

	expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
});

it('should have the reset button selected and disabled by default', () => {
	render(
		<MemoryRouter>
			<Filter<'discount'> options={filterOptions} field={filterField} />
		</MemoryRouter>
	);

	const resetButton = screen.getByRole('button', { name: /all/i });

	expect(resetButton).toBeDisabled();
});

it('should disable the button for selected filter', () => {
	render(
		<MemoryRouter initialEntries={['?discount=true']}>
			<Filter<'discount'> options={filterOptions} field={filterField} />
		</MemoryRouter>
	);

	expect(screen.getByRole('button', { name: /^discount$/i })).toBeDisabled();
});
