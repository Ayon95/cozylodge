import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { Toaster } from 'react-hot-toast';
import { MemoryRouter } from 'react-router-dom';

import { renderWithQueryClient } from '@/test/utils';
import Cabins from '../Cabins';
import supabase from '@/services/supabase';
import { userSession } from '@/test/fixtures/authentication';
import { CABINS_BASE_URL } from '@/utils/constants';
import { mockServer } from '@/test/mocks/server';
import { db } from '@/test/mocks/db';
import { cabins } from '@/test/fixtures/cabins';

const deleteButtonRegex = /delete/i;
const updateButtonInCellRegex = /update/i;
const updateButtonInFormRegex = /update cabin/i;
const updateCabinModalTitleRegex = /update cabin/i;
const confirmDeleteButtonRegex = /delete/i;
const confirmDeleteModalTitleRegex = /are you sure you want to delete?/i;

function setup() {
	renderWithQueryClient(
		<MemoryRouter>
			<Cabins />
		</MemoryRouter>
	);
}

function setupWithLogin(initialPath: string = '') {
	// Setting logged in user
	vi.spyOn(supabase.auth, 'getSession').mockResolvedValue(userSession);

	renderWithQueryClient(
		<MemoryRouter initialEntries={[initialPath]}>
			<Cabins />
			<Toaster />
		</MemoryRouter>
	);
}

afterEach(() => {
	vi.restoreAllMocks();
});

describe('Cabins', () => {
	it('should not show any cabins if there is no logged in user', async () => {
		setup();

		const noCabinsTextElement = await screen.findByText(/no cabins to show/i);

		expect(noCabinsTextElement).toBeInTheDocument();
	});

	it('should show discount filter controls', () => {
		setup();

		const elements = [
			screen.getByRole('button', { name: /all/i }),
			screen.getByRole('button', { name: /^discount$/i }),
			screen.getByRole('button', { name: /^no discount$/i }),
		];

		elements.forEach(element => {
			expect(element).toBeInTheDocument();
		});
	});

	it('should show a select control for sorting by various options', () => {
		setup();

		const sortBySelect = screen.getByLabelText(/sort by/i);

		expect(sortBySelect).toBeInTheDocument();

		const options = [
			within(sortBySelect).getByRole('option', { name: /sort by/i }),
			within(sortBySelect).getByRole('option', { name: /^name \(a-z\)$/i }),
			within(sortBySelect).getByRole('option', { name: /^name \(z-a\)$/i }),
			within(sortBySelect).getByRole('option', { name: /^price \(lowest to highest\)$/i }),
			within(sortBySelect).getByRole('option', { name: /^price \(highest to lowest\)$/i }),
			within(sortBySelect).getByRole('option', { name: /^max capacity \(lowest to highest\)$/i }),
			within(sortBySelect).getByRole('option', { name: /^max capacity \(highest to lowest\)$/i }),
		];

		options.forEach(option => {
			expect(option).toBeInTheDocument();
		});
	});

	it('should only show cabins with discount if discount filter is selected', async () => {
		setupWithLogin('?discount=true');

		const cabinRows = await screen.findAllByRole('row');

		// In cabins fixture, there is one cabin with no discount
		// The first row in cabinRows is the column header row
		expect(cabinRows.length - 1).toEqual(cabins.length - 1);
	});

	it('should only show cabins with no discount if no discount filter is selected', async () => {
		setupWithLogin('?discount=false');

		const cabinRows = await screen.findAllByRole('row');

		// In cabins fixture, there is one cabin with no discount
		// The first row in cabinRows is the column header row
		expect(cabinRows.length - 1).toEqual(1);
	});

	it('should sort by name in ascending order correctly', async () => {
		setupWithLogin('?sort=name-asc');

		const cabinRows = await screen.findAllByRole('row');
		const firstCabinCells = within(cabinRows[1]).getAllByRole('cell');
		const secondCabinCells = within(cabinRows[2]).getAllByRole('cell');
		const thirdCabinCells = within(cabinRows[3]).getAllByRole('cell');

		expect(firstCabinCells[1]).toHaveTextContent('Test 001');
		expect(secondCabinCells[1]).toHaveTextContent('Test 002');
		expect(thirdCabinCells[1]).toHaveTextContent('Test 003');
	});

	it('should sort by name in descending order correctly', async () => {
		setupWithLogin('?sort=name-desc');

		const cabinRows = await screen.findAllByRole('row');
		const firstCabinCells = within(cabinRows[1]).getAllByRole('cell');
		const secondCabinCells = within(cabinRows[2]).getAllByRole('cell');
		const thirdCabinCells = within(cabinRows[3]).getAllByRole('cell');

		expect(firstCabinCells[1]).toHaveTextContent('Test 003');
		expect(secondCabinCells[1]).toHaveTextContent('Test 002');
		expect(thirdCabinCells[1]).toHaveTextContent('Test 001');
	});

	it('should sort by price in ascending order correctly', async () => {
		setupWithLogin('?sort=regular_price-asc');

		const cabinRows = await screen.findAllByRole('row');
		const firstCabinCells = within(cabinRows[1]).getAllByRole('cell');
		const secondCabinCells = within(cabinRows[2]).getAllByRole('cell');
		const thirdCabinCells = within(cabinRows[3]).getAllByRole('cell');

		expect(firstCabinCells[3]).toHaveTextContent('$250.00');
		expect(secondCabinCells[3]).toHaveTextContent('$500.00');
		expect(thirdCabinCells[3]).toHaveTextContent('$700.00');
	});

	it('should sort by price in descending order correctly', async () => {
		setupWithLogin('?sort=regular_price-desc');

		const cabinRows = await screen.findAllByRole('row');
		const firstCabinCells = within(cabinRows[1]).getAllByRole('cell');
		const secondCabinCells = within(cabinRows[2]).getAllByRole('cell');
		const thirdCabinCells = within(cabinRows[3]).getAllByRole('cell');

		expect(firstCabinCells[3]).toHaveTextContent('$700.00');
		expect(secondCabinCells[3]).toHaveTextContent('$500.00');
		expect(thirdCabinCells[3]).toHaveTextContent('$250.00');
	});

	it('should sort by max capacity in ascending order correctly', async () => {
		setupWithLogin('?sort=max_capacity-asc');

		const cabinRows = await screen.findAllByRole('row');
		const firstCabinCells = within(cabinRows[1]).getAllByRole('cell');
		const secondCabinCells = within(cabinRows[2]).getAllByRole('cell');
		const thirdCabinCells = within(cabinRows[3]).getAllByRole('cell');

		expect(firstCabinCells[2]).toHaveTextContent('2');
		expect(secondCabinCells[2]).toHaveTextContent('4');
		expect(thirdCabinCells[2]).toHaveTextContent('6');
	});

	it('should sort by max capacity in descending order correctly', async () => {
		setupWithLogin('?sort=max_capacity-desc');

		const cabinRows = await screen.findAllByRole('row');
		const firstCabinCells = within(cabinRows[1]).getAllByRole('cell');
		const secondCabinCells = within(cabinRows[2]).getAllByRole('cell');
		const thirdCabinCells = within(cabinRows[3]).getAllByRole('cell');

		expect(firstCabinCells[2]).toHaveTextContent('6');
		expect(secondCabinCells[2]).toHaveTextContent('4');
		expect(thirdCabinCells[2]).toHaveTextContent('2');
	});

	it('should delete a cabin after confirmation and show a deletion success message', async () => {
		setupWithLogin();

		const user = userEvent.setup();
		const cabinRows = await screen.findAllByRole('row');
		const firstCabinDeleteButton = await within(cabinRows[1]).findByRole('button', {
			name: deleteButtonRegex,
		});

		await user.click(firstCabinDeleteButton);

		const confirmDeleteModal = screen.getByRole('dialog', {
			name: confirmDeleteModalTitleRegex,
		});
		const confirmDeleteButton = within(confirmDeleteModal).getByRole('button', {
			name: confirmDeleteButtonRegex,
		});

		await user.click(confirmDeleteButton);

		const toast = await screen.findByText(/cabin deleted successfully!/i);

		expect(toast).toBeInTheDocument();
		expect(confirmDeleteModal).not.toBeInTheDocument();
		expect(cabinRows[1]).not.toBeInTheDocument();

		// Reset cabin data in the database by adding back the first cabin
		db.cabin.create(cabins[0]);
	});

	it('should show deletion error message if a cabin cannot be deleted', async () => {
		mockServer.use(
			rest.delete(CABINS_BASE_URL, (_, res) => {
				return res.networkError('A network error occurred');
			})
		);

		setupWithLogin();

		const user = userEvent.setup();
		const cabinRows = await screen.findAllByRole('row');
		const firstCabinDeleteButton = await within(cabinRows[1]).findByRole('button', {
			name: deleteButtonRegex,
		});

		await user.click(firstCabinDeleteButton);

		const confirmDeleteModal = screen.getByRole('dialog', {
			name: confirmDeleteModalTitleRegex,
		});
		const confirmDeleteButton = within(confirmDeleteModal).getByRole('button', {
			name: confirmDeleteButtonRegex,
		});

		await user.click(confirmDeleteButton);

		const toast = await screen.findByText(/cabin could not be deleted/i);

		expect(toast).toBeInTheDocument();
	});

	it('should show created cabin and a success message when a cabin is created', async () => {
		setupWithLogin();

		const user = userEvent.setup();
		const imageFile = new File(['test'], 'cabin_image.png', { type: 'image/png' });
		const createCabinForm = await screen.findByRole('form', { name: /create a cabin/i });

		await user.type(within(createCabinForm).getByLabelText(/name/i), 'Test name');
		await user.type(within(createCabinForm).getByLabelText(/description/i), 'Test description');
		await user.type(within(createCabinForm).getByLabelText(/max capacity/i), '6');
		await user.type(within(createCabinForm).getByLabelText(/price/i), '600');
		await user.type(within(createCabinForm).getByLabelText(/discount/i), '20');
		await user.upload(within(createCabinForm).getByLabelText(/image/i), imageFile);
		await user.click(within(createCabinForm).getByRole('button', { name: /create cabin/i }));

		const successMessage = await screen.findByText(/cabin created successfully!/i);
		const cabinNameCell = await screen.findByRole('cell', { name: 'Test name' });

		expect(successMessage).toBeInTheDocument();
		expect(cabinNameCell).toBeInTheDocument();

		db.cabin.delete({ where: { name: { equals: 'Test name' } } });
	});
});

it('should show updated cabin and a success message when a cabin is updated', async () => {
	setupWithLogin();

	const cabin = cabins[0];
	const updatedName = `${cabin.name} updated`;
	const user = userEvent.setup();
	const cabinRows = await screen.findAllByRole('row');
	const firstCabinUpdateButton = within(cabinRows[1]).getByRole('button', {
		name: updateButtonInCellRegex,
	});

	await user.click(firstCabinUpdateButton);

	const updateCabinModal = screen.getByRole('dialog', { name: updateCabinModalTitleRegex });
	const updateCabinForm = within(updateCabinModal).getByRole('form', {
		name: updateCabinModalTitleRegex,
	});
	const nameInput = within(updateCabinForm).getByLabelText(/name/i);
	const submitButton = within(updateCabinForm).getByRole('button', {
		name: updateButtonInFormRegex,
	});

	await user.clear(nameInput);
	await user.type(nameInput, updatedName);
	await user.click(submitButton);

	const successMessage = await screen.findByText(/cabin updated successfully!/i);
	const cabinNameCell = await screen.findByRole('cell', { name: updatedName });

	expect(successMessage).toBeInTheDocument();
	expect(cabinNameCell).toBeInTheDocument();

	db.cabin.update({
		where: { name: { equals: updatedName } },
		data: { name: cabin.name },
	});
});

it('should show update error message if a cabin cannot be updated', async () => {
	mockServer.use(
		rest.patch(CABINS_BASE_URL, (_, res) => {
			return res.networkError('A network error occurred');
		})
	);

	setupWithLogin();

	const user = userEvent.setup();
	const cabinRows = await screen.findAllByRole('row');
	const firstCabinUpdateButton = within(cabinRows[1]).getByRole('button', {
		name: updateButtonInCellRegex,
	});

	await user.click(firstCabinUpdateButton);

	const updateCabinModal = screen.getByRole('dialog', { name: updateCabinModalTitleRegex });
	const updateCabinForm = within(updateCabinModal).getByRole('form', {
		name: updateCabinModalTitleRegex,
	});
	const nameInput = within(updateCabinForm).getByLabelText(/name/i);
	const submitButton = within(updateCabinForm).getByRole('button', {
		name: updateButtonInFormRegex,
	});

	await user.clear(nameInput);
	await user.type(nameInput, 'Test name updated');
	await user.click(submitButton);

	const errorMessage = await screen.findByText(/cabin could not be updated/i);

	expect(errorMessage).toBeInTheDocument();
});
