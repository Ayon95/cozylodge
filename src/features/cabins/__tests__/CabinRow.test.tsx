import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CabinRow from '../CabinRow';
import { Tables } from '@/types/database';
import { cabins } from '@/test/fixtures/cabins';
import { renderWithQueryClient } from '@/test/utils';

const mockOnClickDelete = vi.fn();
const mockOnClickUpdate = vi.fn();

function setup(cabin: Tables<'cabin'>) {
	renderWithQueryClient(
		<table>
			<tbody>
				<CabinRow
					cabin={cabin}
					onClickDelete={mockOnClickDelete}
					onClickUpdate={mockOnClickUpdate}
				/>
			</tbody>
		</table>
	);
}

afterEach(() => {
	vi.restoreAllMocks();
});

describe('CabinRow', () => {
	it('should have image cell with correct src and alt attributes', () => {
		const cabin = cabins[0];
		setup(cabins[0]);

		const imageCell = screen.getAllByRole('cell')[0];
		const image = within(imageCell).getByRole('img');

		expect(image).toHaveAttribute('src', expect.stringContaining(cabin.image_url));
		expect(image).toHaveAttribute('alt', `${cabin.name}, ${cabin.description}`);
	});

	it('should have an actions cell with a delete button', () => {
		setup(cabins[0]);

		const actionsCell = screen.getAllByRole('cell')[5];

		expect(within(actionsCell).getByRole('button', { name: /delete/i })).toBeInTheDocument();
	});

	it('should call onClickDelete with cabin data when delete button is clicked', async () => {
		const cabin = cabins[0];
		setup(cabin);
		const user = userEvent.setup();
		const actionsCell = screen.getAllByRole('cell')[5];
		const deleteButton = within(actionsCell).getByRole('button', { name: /delete/i });

		await user.click(deleteButton);

		expect(mockOnClickDelete).toHaveBeenCalledWith(cabin);
	});

	it('should call onClickUpdate with cabin data when update button is clicked', async () => {
		const cabin = cabins[0];
		setup(cabin);
		const user = userEvent.setup();
		const actionsCell = screen.getAllByRole('cell')[5];
		const updateButton = within(actionsCell).getByRole('button', { name: /update/i });

		await user.click(updateButton);

		expect(mockOnClickUpdate).toHaveBeenCalledWith(cabin);
	});

	it('should show dash in discount cell if cabin has no discount', () => {
		const cabinWithoutDiscount: Tables<'cabin'> = {
			id: 1,
			created_at: '2023-09-16T01:38:13.379438+00:00',
			name: 'Test 001',
			max_capacity: 2,
			regular_price: 250,
			description: 'A small luxury cabin in the woods',
			discount: 0,
			image_url: 'test url 1',
			user_id: 'test id',
		};

		setup(cabinWithoutDiscount);

		const cells = screen.getAllByRole('cell');

		expect(cells[4]).toHaveTextContent('—');
	});
});
