import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/ui/button/Button';
import Form from '@/ui/form/Form';
import FormControl from '@/ui/form/FormControl';
import { MAX_CABIN_DISCOUNT, MAX_CABIN_IMAGE_SIZE, MIN_CABIN_NAME_LENGTH } from '@/utils/constants';
import { useUpdateCabin } from './hooks/useUpdateCabin';
import SpinnerMini from '@/ui/spinner/SpinnerMini';
import { Tables } from '@/types/database';
import { CabinUpdateDTO } from '@/types/cabins';
import { getModifiedFormFieldValues } from '@/utils/helpers';

interface UpdateCabinFormProps {
	cabin: Tables<'cabin'>;
	settings: Tables<'settings'>;
	onUpdate?: () => void;
}

function UpdateCabinForm({ cabin, settings, onUpdate }: UpdateCabinFormProps) {
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
			.refine(files => (files.length === 0 ? true : files[0].type.startsWith('image')), {
				message: 'File must be an image',
			})
			.refine(files => (files.length === 0 ? true : files[0].size <= MAX_CABIN_IMAGE_SIZE), {
				message: `Image file size cannot exceed ${MAX_CABIN_IMAGE_SIZE / (1024 * 1024)}MB`,
			}),
	});

	type FormData = z.infer<typeof formSchema>;

	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),

		defaultValues: {
			name: cabin.name,
			description: cabin.description,
			max_capacity: cabin.max_capacity,
			regular_price: cabin.regular_price,
			discount: cabin.discount || 0,
		},
	});
	const formErrors = form.formState.errors;
	const dirtyFields = form.formState.dirtyFields;

	const updateCabinMutation = useUpdateCabin();

	function handleSubmit(formData: FormData) {
		const updatedData: CabinUpdateDTO = getModifiedFormFieldValues(dirtyFields, formData);

		updateCabinMutation.mutate({ cabin, updatedData }, { onSettled: () => onUpdate?.() });
	}
	return (
		<Form
			onSubmit={form.handleSubmit(handleSubmit)}
			aria-labelledby="updateCabinFormLabel"
			noValidate
		>
			<span className="sr-only" id="updateCabinFormLabel">
				Update cabin
			</span>
			<FormControl
				labelInfo={{ label: 'Name', inputId: 'nameUpdate' }}
				error={formErrors.name?.message}
			>
				<input
					{...form.register('name')}
					type="text"
					id="nameUpdate"
					aria-invalid={formErrors.name ? 'true' : 'false'}
					disabled={updateCabinMutation.isLoading}
				/>
			</FormControl>
			<FormControl
				labelInfo={{ label: 'Description', inputId: 'descriptionUpdate' }}
				error={formErrors.description?.message}
			>
				<textarea
					{...form.register('description')}
					id="descriptionUpdate"
					aria-invalid={formErrors.description ? 'true' : 'false'}
					disabled={updateCabinMutation.isLoading}
				/>
			</FormControl>
			<FormControl
				labelInfo={{ label: 'Max capacity', inputId: 'maxCapacityUpdate' }}
				error={formErrors.max_capacity?.message}
			>
				<input
					{...form.register('max_capacity')}
					type="number"
					id="maxCapacityUpdate"
					aria-invalid={formErrors.max_capacity ? 'true' : 'false'}
					disabled={updateCabinMutation.isLoading}
				/>
			</FormControl>
			<div className="multi-col-input-container">
				<FormControl
					labelInfo={{ label: 'Price', inputId: 'priceUpdate' }}
					error={formErrors.regular_price?.message}
				>
					<input
						{...form.register('regular_price')}
						type="number"
						id="priceUpdate"
						aria-invalid={formErrors.regular_price ? 'true' : 'false'}
						disabled={updateCabinMutation.isLoading}
					/>
				</FormControl>
				<FormControl
					labelInfo={{ label: 'Discount (%)', inputId: 'discountUpdate' }}
					error={formErrors.discount?.message}
				>
					<input
						{...form.register('discount')}
						type="number"
						id="discountUpdate"
						aria-invalid={formErrors.discount ? 'true' : 'false'}
						disabled={updateCabinMutation.isLoading}
					/>
				</FormControl>
			</div>
			<FormControl
				labelInfo={{ label: 'Image', inputId: 'imageUpdate' }}
				error={formErrors.image?.message}
			>
				<input
					{...form.register('image')}
					type="file"
					accept="image/*"
					id="imageUpdate"
					aria-invalid={formErrors.image ? 'true' : 'false'}
					disabled={updateCabinMutation.isLoading}
				/>
				<p className="text-sm">Max file size: {MAX_CABIN_IMAGE_SIZE / (1024 * 1024)}MB</p>
			</FormControl>
			<Button $size="large" disabled={updateCabinMutation.isLoading}>
				{updateCabinMutation.isLoading ? <SpinnerMini /> : 'Update cabin'}
			</Button>
			{updateCabinMutation.isError && <p>{updateCabinMutation.error.message}</p>}
		</Form>
	);
}

export default UpdateCabinForm;
