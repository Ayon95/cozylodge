import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/ui/button/Button';
import Form from '@/ui/form/Form';
import FormControl from '@/ui/form/FormControl';
import { MAX_CABIN_DISCOUNT, MAX_CABIN_IMAGE_SIZE, MIN_CABIN_NAME_LENGTH } from '@/utils/constants';
import { useCreateCabin } from './hooks/useCreateCabin';
import SpinnerMini from '@/ui/spinner/SpinnerMini';
import { Tables } from '@/types/database';

interface CreateCabinFormProps {
	userId: string;
	settings: Tables<'settings'>;
}

function CreateCabinForm({ userId, settings }: CreateCabinFormProps) {
	const formSchema = z.object({
		name: z
			.string()
			.nonempty({ message: 'Cabin name is required' })
			.min(MIN_CABIN_NAME_LENGTH, {
				message: `Name must contain at least ${MIN_CABIN_NAME_LENGTH} characters`,
			}),
		description: z.string().nonempty({ message: 'Cabin description is required' }),
		max_capacity: z.coerce
			.number()
			.int({ message: 'Max capacity must be a whole number' })
			.gt(0, { message: 'Max capacity must be greater than 0' })
			.lte(settings.max_guests_per_booking, {
				message: `Max capacity cannot be greater than ${settings.max_guests_per_booking}`,
			}),
		regular_price: z.coerce.number().positive({ message: 'Price must be greater than 0' }),
		discount: z.coerce
			.number()
			.int({ message: 'Discount must be a whole number' })
			.gte(0, { message: 'Discount cannot be negative' })
			.lte(MAX_CABIN_DISCOUNT, {
				message: `Discount cannot be greater than ${MAX_CABIN_DISCOUNT}%`,
			}),
		image: z
			.custom<FileList>()
			.refine(files => files.length > 0, { message: 'Cabin image is required' })
			.refine(files => files?.[0]?.type.startsWith('image'), { message: 'File must be an image' })
			.refine(files => files?.[0]?.size <= MAX_CABIN_IMAGE_SIZE, {
				message: `Image file size cannot exceed ${MAX_CABIN_IMAGE_SIZE / (1024 * 1024)}MB`,
			}),
	});

	type FormData = z.infer<typeof formSchema>;

	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			max_capacity: 1,
			discount: 0,
		},
	});
	const formErrors = form.formState.errors;

	const createCabinMutation = useCreateCabin();

	function handleSubmit(formData: FormData) {
		createCabinMutation.mutate({ ...formData, user_id: userId }, { onSuccess: () => form.reset() });
	}
	return (
		<Form
			onSubmit={form.handleSubmit(handleSubmit)}
			aria-labelledby="createCabinFormLabel"
			noValidate
		>
			<span className="sr-only" id="createCabinFormLabel">
				Create a cabin
			</span>
			<FormControl labelInfo={{ label: 'Name', inputId: 'name' }} error={formErrors.name?.message}>
				<input
					{...form.register('name')}
					type="text"
					id="name"
					aria-invalid={formErrors.name ? 'true' : 'false'}
					disabled={createCabinMutation.isLoading}
				/>
			</FormControl>
			<FormControl
				labelInfo={{ label: 'Description', inputId: 'description' }}
				error={formErrors.description?.message}
			>
				<textarea
					{...form.register('description')}
					id="description"
					aria-invalid={formErrors.description ? 'true' : 'false'}
					disabled={createCabinMutation.isLoading}
				/>
			</FormControl>
			<FormControl
				labelInfo={{ label: 'Max capacity', inputId: 'max_capacity' }}
				error={formErrors.max_capacity?.message}
			>
				<input
					{...form.register('max_capacity')}
					type="number"
					id="max_capacity"
					aria-invalid={formErrors.max_capacity ? 'true' : 'false'}
					disabled={createCabinMutation.isLoading}
				/>
			</FormControl>
			<div className="multi-col-input-container">
				<FormControl
					labelInfo={{ label: 'Price', inputId: 'regular_price' }}
					error={formErrors.regular_price?.message}
				>
					<input
						{...form.register('regular_price')}
						type="number"
						id="regular_price"
						aria-invalid={formErrors.regular_price ? 'true' : 'false'}
						disabled={createCabinMutation.isLoading}
					/>
				</FormControl>
				<FormControl
					labelInfo={{ label: 'Discount (%)', inputId: 'discount' }}
					error={formErrors.discount?.message}
				>
					<input
						{...form.register('discount')}
						type="number"
						id="discount"
						aria-invalid={formErrors.discount ? 'true' : 'false'}
						disabled={createCabinMutation.isLoading}
					/>
				</FormControl>
			</div>
			<FormControl
				labelInfo={{ label: 'Image', inputId: 'image' }}
				error={formErrors.image?.message}
			>
				<input
					{...form.register('image')}
					type="file"
					accept="image/*"
					id="image"
					aria-invalid={formErrors.image ? 'true' : 'false'}
					disabled={createCabinMutation.isLoading}
				/>
				<p className="text-sm">Max file size: {MAX_CABIN_IMAGE_SIZE / (1024 * 1024)}MB</p>
			</FormControl>
			<Button $size="large" disabled={createCabinMutation.isLoading}>
				{createCabinMutation.isLoading ? <SpinnerMini /> : 'Create cabin'}
			</Button>
			{createCabinMutation.isError && <p>{createCabinMutation.error.message}</p>}
		</Form>
	);
}

export default CreateCabinForm;
