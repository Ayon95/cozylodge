import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithQueryClient } from '@/test/utils';
import UpdateCabinForm from '../UpdateCabinForm';
import { MAX_CABIN_DISCOUNT, MAX_CABIN_IMAGE_SIZE, MIN_CABIN_NAME_LENGTH } from '@/utils/constants';
import { MockFile } from '@/test/types';
import { cabins } from '@/test/fixtures/cabins';

const submitButtonRegex = /update cabin/i;

function setup() {
	const cabin = cabins[0];
	renderWithQueryClient(<UpdateCabinForm cabin={cabin} />);
}

describe('UpdateCabinForm', () => {
	it('should render a form element', () => {
		setup();
		expect(screen.getByRole('form', { name: /update cabin/i })).toBeInTheDocument();
	});

	it('should have all the necessary fields and submit button', () => {
		setup();
		const nameInput = screen.getByLabelText(/name/i);
		const descriptionInput = screen.getByLabelText(/description/i);
		const maxCapacityInput = screen.getByLabelText(/max capacity/i);
		const priceInput = screen.getByLabelText(/price/i);
		const discountInput = screen.getByLabelText(/discount/i);
		const imageInput = screen.getByLabelText(/image/i);
		const submitButton = screen.getByRole('button', { name: submitButtonRegex });

		const elements = [
			nameInput,
			descriptionInput,
			maxCapacityInput,
			priceInput,
			discountInput,
			imageInput,
			submitButton,
		];

		for (const element of elements) {
			expect(element).toBeInTheDocument();
		}
	});

	it('should have form fields pre-filled with cabin data', () => {
		setup();
		const cabin = cabins[0];
		const nameInput = screen.getByDisplayValue(cabin.name);
		const descriptionInput = screen.getByDisplayValue(cabin.description);
		const maxCapacityInput = screen.getByDisplayValue(cabin.max_capacity);
		const priceInput = screen.getByDisplayValue(cabin.regular_price);
		const discountInput = screen.getByDisplayValue(cabin.discount || 0);

		[nameInput, descriptionInput, maxCapacityInput, priceInput, discountInput].forEach(element =>
			expect(element).toBeInTheDocument()
		);
	});

	it('should show error messages if required input values are not provided', async () => {
		setup();
		const user = userEvent.setup();

		await user.clear(screen.getByLabelText(/name/i));
		await user.clear(screen.getByLabelText(/description/i));
		await user.clear(screen.getByLabelText(/price/i));

		await user.click(screen.getByRole('button', { name: submitButtonRegex }));

		const nameError = screen.getByText(/name is required/i);
		const descriptionError = screen.getByText(/description is required/i);
		const priceError = screen.getByText(/price must be greater than 0/i);

		[nameError, descriptionError, priceError].forEach(element =>
			expect(element).toBeInTheDocument()
		);
	});

	it('should show an error message if cabin name has fewer than minimum characters', async () => {
		setup();
		const user = userEvent.setup();
		const name = '*'.repeat(MIN_CABIN_NAME_LENGTH - 1);
		const nameInput = screen.getByLabelText(/name/i);

		await user.clear(nameInput);
		await user.type(nameInput, name);
		await user.click(screen.getByRole('button', { name: submitButtonRegex }));

		const error = screen.getByText(
			`Name must contain at least ${MIN_CABIN_NAME_LENGTH} characters`
		);

		expect(error).toBeInTheDocument();
	});

	it('should show an error message if max capacity value is a decimal number', async () => {
		setup();
		const user = userEvent.setup();
		const maxCapacityInput = screen.getByLabelText(/max capacity/i);

		await user.clear(maxCapacityInput);
		await user.type(maxCapacityInput, (1.5).toString());
		await user.click(screen.getByRole('button', { name: submitButtonRegex }));

		const error = screen.getByText(/max capacity must be a whole number/i);

		expect(error).toBeInTheDocument();
	});

	it('should show an error message if max capacity value is less than 1', async () => {
		setup();
		const user = userEvent.setup();

		await user.clear(screen.getByLabelText(/max capacity/i));
		await user.click(screen.getByRole('button', { name: submitButtonRegex }));

		const error = screen.getByText(/max capacity must be greater than 0/i);

		expect(error).toBeInTheDocument();
	});

	it('should show an error message if discount is a decimal number', async () => {
		setup();
		const user = userEvent.setup();
		const discountInput = screen.getByLabelText(/discount/i);

		await user.clear(discountInput);
		await user.type(discountInput, (10.5).toString());
		await user.click(screen.getByRole('button', { name: submitButtonRegex }));

		const error = screen.getByText(/discount must be a whole number/i);

		expect(error).toBeInTheDocument();
	});

	it('should show an error message if discount is negative', async () => {
		setup();
		const user = userEvent.setup();
		const discountInput = screen.getByLabelText(/discount/i);

		await user.clear(discountInput);
		await user.type(discountInput, (-10).toString());
		await user.click(screen.getByRole('button', { name: submitButtonRegex }));

		const error = screen.getByText(/discount cannot be negative/i);

		expect(error).toBeInTheDocument();
	});

	it('should show an error message if discount value is greater than the max allowed discount', async () => {
		setup();
		const user = userEvent.setup();
		const discountInput = screen.getByLabelText(/discount/i);

		await user.clear(discountInput);
		await user.type(discountInput, (MAX_CABIN_DISCOUNT + 1).toString());
		await user.click(screen.getByRole('button', { name: submitButtonRegex }));

		const error = screen.getByText(`Discount cannot be greater than ${MAX_CABIN_DISCOUNT}%`);

		expect(error).toBeInTheDocument();
	});

	it('should show an error message if the uploaded file is not an image', async () => {
		setup();
		const user = userEvent.setup({ applyAccept: false });
		const file = new File(['test'], 'test_file.txt', { type: 'text/plain' });

		await user.upload(screen.getByLabelText(/image/i), file);
		await user.click(screen.getByRole('button', { name: submitButtonRegex }));

		const error = screen.getByText(/file must be an image/i);

		expect(error).toBeInTheDocument();
	});

	it('should show an error message if the uploaded image file exceeds max allowed size', async () => {
		setup();
		const user = userEvent.setup();
		const file: MockFile = new File(['test'], 'image.png', { type: 'image/png' });

		Object.defineProperty(file, 'size', { value: MAX_CABIN_IMAGE_SIZE + 1 });

		await user.upload(screen.getByLabelText(/image/i), file);
		await user.click(screen.getByRole('button', { name: submitButtonRegex }));

		const error = screen.getByText(
			`Image file size cannot exceed ${MAX_CABIN_IMAGE_SIZE / (1024 * 1024)}MB`
		);

		expect(error).toBeInTheDocument();
	});
});
