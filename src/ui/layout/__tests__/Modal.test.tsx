import Modal from '@/ui/Modal';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

const mockCloseModal = vi.fn();

afterEach(() => {
	vi.restoreAllMocks();
});

function setup() {
	render(
		<Modal title="This is a modal" closeModal={mockCloseModal}>
			<p>This is some content</p>
			<button>Some Button</button>
		</Modal>
	);
}

describe('Modal', () => {
	it('should have a title, body content, and two close buttons', () => {
		setup();
		const modalContainer = screen.getByRole('dialog', { name: /this is a modal/i });
		const titleElement = within(modalContainer).getByRole('heading', { name: /this is a modal/i });
		const closeButtons = within(modalContainer).getAllByRole('button', { name: /close/i });
		const bodyContentElement = within(modalContainer).getByText(/this is some content/i);

		expect(modalContainer).toHaveAttribute('aria-modal', 'true');
		expect(titleElement).toBeInTheDocument();
		expect(bodyContentElement).toBeInTheDocument();
		expect(closeButtons).toHaveLength(2);
	});

	it('should call the function to close the modal when a close button is clicked', async () => {
		setup();
		const user = userEvent.setup();
		const closeButtons = screen.getAllByRole('button', { name: /close/i });

		for (const closeButton of closeButtons) {
			await user.click(closeButton);
			expect(mockCloseModal).toBeCalled();
		}
	});

	it('the first close button should have focus when the modal is open', () => {
		setup();
		const closeButtons = screen.getAllByRole('button', { name: /close/i });

		expect(closeButtons[0]).toHaveFocus();
	});

	it('focus should go back to the first close button when the last close button has focus and Tab is pressed', async () => {
		setup();
		const user = userEvent.setup();
		const closeButtons = screen.getAllByRole('button', { name: /close/i });
		// Tabbing from the first close button all the way to the last close button and back to the first
		await user.keyboard('{Tab}{Tab}{Tab}');

		expect(closeButtons[0]).toHaveFocus();
	});

	it('focus should go back to the last close button when the first close button has focus and Shift + Tab is pressed', async () => {
		setup();
		const user = userEvent.setup();
		const closeButtons = screen.getAllByRole('button', { name: /close/i });

		await user.keyboard('{Shift>}{Tab}');

		expect(closeButtons[1]).toHaveFocus();
	});
});
