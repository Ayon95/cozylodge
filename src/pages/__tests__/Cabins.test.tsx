import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { Toaster } from 'react-hot-toast';

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

function setupWithLogin() {
	// Setting logged in user
	vi.spyOn(supabase.auth, 'getSession').mockResolvedValue(userSession);

	renderWithQueryClient(
		<>
			<Cabins />
			<Toaster />
		</>
	);
}

afterEach(() => {
	vi.restoreAllMocks();
});

describe('Cabins', () => {
	it('should not show any cabins if there is no logged in user', async () => {
		renderWithQueryClient(<Cabins />);

		const noCabinsTextElement = await screen.findByText(/no cabins to show/i);

		expect(noCabinsTextElement).toBeInTheDocument();
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
