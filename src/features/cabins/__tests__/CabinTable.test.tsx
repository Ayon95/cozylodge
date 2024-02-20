import { screen, within } from '@testing-library/react';
import { renderWithQueryClient } from '@/test/utils';

import CabinTable from '../CabinTable';
import { cabins } from '@/test/fixtures/cabins';
import { MemoryRouter } from 'react-router-dom';

function setup() {
	renderWithQueryClient(
		<MemoryRouter>
			<CabinTable cabins={cabins} />
		</MemoryRouter>
	);
}

describe('CabinTable', () => {
	it('should have all column headers in the correct order', async () => {
		setup();

		const columnHeaders = await screen.findAllByRole('columnheader');

		expect(columnHeaders[0]).toHaveTextContent(/image/i);
		expect(columnHeaders[1]).toHaveTextContent(/cabin/i);
		expect(columnHeaders[2]).toHaveTextContent(/capacity/i);
		expect(columnHeaders[3]).toHaveTextContent(/price/i);
		expect(columnHeaders[4]).toHaveTextContent(/discount/i);
		expect(columnHeaders[5]).toHaveTextContent(/actions/i);
	});

	it('should have rows with cabin details in the correct order', async () => {
		setup();

		const cabinRows = await screen.findAllByRole('row');
		// The first row contains column headers
		const firstCabinCells = await within(cabinRows[1]).findAllByRole('cell');
		const secondCabinCells = await within(cabinRows[2]).findAllByRole('cell');

		const [firstCabin, secondCabin] = cabins;
		const firstCabinImage = within(firstCabinCells[0]).getByRole('img');
		const secondCabinImage = within(secondCabinCells[0]).getByRole('img');

		expect(firstCabinImage).toBeInTheDocument();
		expect(firstCabinCells[1]).toHaveTextContent(firstCabin.name);
		expect(firstCabinCells[2]).toHaveTextContent(firstCabin.max_capacity.toString());
		expect(firstCabinCells[3]).toHaveTextContent(`$${firstCabin.regular_price}.00`);
		expect(firstCabinCells[4]).toHaveTextContent(`$${firstCabin.discount}.00`);

		expect(secondCabinImage).toBeInTheDocument();
		expect(secondCabinCells[1]).toHaveTextContent(secondCabin.name);
		expect(secondCabinCells[2]).toHaveTextContent(secondCabin.max_capacity.toString());
		expect(secondCabinCells[3]).toHaveTextContent(`$${secondCabin.regular_price}.00`);
		expect(secondCabinCells[4]).toHaveTextContent(`$${secondCabin.discount}.00`);
	});
});
