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

const deleteButtonRegex = /delete/i;

describe('Cabins', () => {
	it('should not show any cabins if there is no logged in user', async () => {
		renderWithQueryClient(<Cabins />);

		const noCabinsTextElement = await screen.findByText(/no cabins to show/i);

		expect(noCabinsTextElement).toBeInTheDocument();
	});

	it('should show deletion success message when a cabin is deleted', async () => {
		// Setting logged in user
		vi.spyOn(supabase.auth, 'getSession').mockResolvedValueOnce(userSession);

		renderWithQueryClient(
			<>
				<Cabins />
				<Toaster />
			</>
		);

		const user = userEvent.setup();
		const cabinRows = await screen.findAllByRole('row');
		const firstCabinDeleteButton = await within(cabinRows[1]).findByRole('button', {
			name: deleteButtonRegex,
		});

		await user.click(firstCabinDeleteButton);

		const toast = await screen.findByText(/cabin deleted successfully!/i);

		expect(toast).toBeInTheDocument();
	});

	it('should show deletion error message if a cabin cannot be deleted', async () => {
		mockServer.use(
			rest.delete(CABINS_BASE_URL, (_, res) => {
				return res.networkError('A network error occurred');
			})
		);

		vi.spyOn(supabase.auth, 'getSession').mockResolvedValueOnce(userSession);

		renderWithQueryClient(
			<>
				<Cabins />
				<Toaster />
			</>
		);

		const user = userEvent.setup();
		const cabinRows = await screen.findAllByRole('row');
		const firstCabinDeleteButton = await within(cabinRows[1]).findByRole('button', {
			name: deleteButtonRegex,
		});

		await user.click(firstCabinDeleteButton);

		const toast = await screen.findByText(/cabin could not be deleted/i);

		expect(toast).toBeInTheDocument();
	});
});
