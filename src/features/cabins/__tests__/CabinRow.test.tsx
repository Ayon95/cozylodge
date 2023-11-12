import { render, screen, within } from '@testing-library/react';
import CabinRow from '../CabinRow';
import { Tables } from '@/types/database';
import { cabins } from '@/test/fixtures/cabins';

describe('CabinRow', () => {
	it('should have image cell with correct src and alt attributes', () => {
		const cabin = cabins[0];
		render(
			<table>
				<tbody>
					<CabinRow cabin={cabin} />
				</tbody>
			</table>
		);

		const imageCell = screen.getAllByRole('cell')[0];
		const image = within(imageCell).getByRole('img');

		expect(image).toHaveAttribute('src', cabin.image_url);
		expect(image).toHaveAttribute('alt', `${cabin.name}, ${cabin.description}`);
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

		render(
			<table>
				<tbody>
					<CabinRow cabin={cabinWithoutDiscount} />
				</tbody>
			</table>
		);

		const cells = screen.getAllByRole('cell');

		expect(cells[4]).toHaveTextContent('—');
	});
});
