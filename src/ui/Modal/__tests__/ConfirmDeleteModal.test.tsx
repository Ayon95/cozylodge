import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ConfirmDeleteModal, { ConfirmDeleteModalProps } from '@/ui/Modal/ConfirmDeleteModal';

const mockOnCloseModal = vi.fn();
const mockOnConfirmDelete = vi.fn();
const deleteButtonRegex = /delete/i;

function setup(options: Partial<ConfirmDeleteModalProps> = {}) {
	render(
		<ConfirmDeleteModal
			resourceName={options.resourceName || 'test'}
			onCloseModal={options.onCloseModal || mockOnCloseModal}
			onConfirmDelete={options.onConfirmDelete || mockOnConfirmDelete}
			isDeleting={options.isDeleting || false}
		/>
	);
}

afterEach(() => {
	vi.restoreAllMocks();
});

describe('ConfirmDeleteModal', () => {
	it('should render a modal', () => {
		setup();

		const modalContainer = screen.getByRole('dialog');

		expect(modalContainer).toHaveAttribute('aria-modal', 'true');
	});
	it('should have a title, description, and a delete button', () => {
		const resourceName = 'cabin 001';
		setup({ resourceName });

		const titleElement = screen.getByRole('heading', { name: /are you sure you want to delete?/i });
		const descriptionElement = screen.getByText(
			`This action cannot be undone. This will permanently delete ${resourceName}.`
		);
		const deleteButton = screen.getByRole('button', { name: deleteButtonRegex });

		[titleElement, descriptionElement, deleteButton].forEach(element => {
			expect(element).toBeInTheDocument();
		});
	});

	it('should call onConfirmDelete when delete button is clicked', async () => {
		setup();

		const user = userEvent.setup();
		const deleteButton = screen.getByRole('button', { name: deleteButtonRegex });

		await user.click(deleteButton);

		expect(mockOnConfirmDelete).toBeCalled();
	});

	it('delete button should be disabled if isDeleting is true', () => {
		setup({ isDeleting: true });
		const deleteButton = screen.getByRole('button', { name: deleteButtonRegex });

		expect(deleteButton).toBeDisabled();
	});
});
