import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { SettingsUpdateDTO } from '@/types/settings';
import Form from '@/ui/form/Form';
import FormControl from '@/ui/form/FormControl';
import { useUpdateSettings } from './hooks/useUpdateSettings';
import { Button } from '@/ui/button/Button';
import SpinnerMini from '@/ui/spinner/SpinnerMini';
import { getModifiedFormFieldValues } from '@/utils/helpers';
import { Tables } from '@/types/database';

interface UpdateSettingsFormProps {
	settings: Tables<'settings'>;
}

const formSchema = z.object({
	min_booking_length: z.coerce
		.number()
		.int({ message: 'Min nights per booking must be a whole number' })
		.positive({ message: 'Min nights per booking must be greater than 0' }),
	max_booking_length: z.coerce
		.number()
		.int({ message: 'Max nights per booking must be a whole number' })
		.positive({ message: 'Max nights per booking must be greater than 0' }),
	max_guests_per_booking: z.coerce
		.number()
		.int({ message: 'Max guest per booking must be a whole number' })
		.positive({ message: 'Max guests per booking must be greater than 0' }),
	breakfast_price: z.coerce
		.number()
		.positive({ message: 'Breakfast price must be greater than 0' }),
});

type FormData = z.infer<typeof formSchema>;

function UpdateSettingsForm({ settings }: UpdateSettingsFormProps) {
	const { min_booking_length, max_booking_length, max_guests_per_booking, breakfast_price } =
		settings;

	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			min_booking_length,
			max_booking_length,
			max_guests_per_booking,
			breakfast_price,
		},
	});

	const formErrors = form.formState.errors;
	const dirtyFields = form.formState.dirtyFields;

	const updateSettingsMutation = useUpdateSettings();

	function handleSubmit(formData: FormData) {
		const updatedData: SettingsUpdateDTO = getModifiedFormFieldValues(dirtyFields, formData);
		updateSettingsMutation.mutate({ settingsId: settings.id, updatedData });
	}

	return (
		<Form
			onSubmit={form.handleSubmit(handleSubmit)}
			aria-labelledby="updateSettingsFormLabel"
			noValidate
		>
			<span className="sr-only" id="updateSettingsFormLabel">
				Update hotel settings
			</span>
			<div className="multi-col-input-container">
				<FormControl
					labelInfo={{ label: 'Min nights per booking', inputId: 'minBookingLength' }}
					error={formErrors.min_booking_length?.message}
				>
					<input
						{...form.register('min_booking_length')}
						type="number"
						id="minBookingLength"
						aria-invalid={formErrors.min_booking_length ? 'true' : 'false'}
						disabled={updateSettingsMutation.isLoading}
					/>
				</FormControl>
				<FormControl
					labelInfo={{ label: 'Max nights per booking', inputId: 'maxBookingLength' }}
					error={formErrors.max_booking_length?.message}
				>
					<input
						{...form.register('max_booking_length')}
						type="number"
						id="maxBookingLength"
						aria-invalid={formErrors.max_booking_length ? 'true' : 'false'}
						disabled={updateSettingsMutation.isLoading}
					/>
				</FormControl>
			</div>
			<FormControl
				labelInfo={{ label: 'Max guests per booking', inputId: 'maxGuestsPerBooking' }}
				error={formErrors.max_guests_per_booking?.message}
			>
				<input
					{...form.register('max_guests_per_booking')}
					type="number"
					id="maxGuestsPerBooking"
					aria-invalid={formErrors.max_guests_per_booking ? 'true' : 'false'}
					disabled={updateSettingsMutation.isLoading}
				/>
			</FormControl>
			<FormControl
				labelInfo={{ label: 'Breakfast price', inputId: 'breakfastPrice' }}
				error={formErrors.breakfast_price?.message}
			>
				<input
					{...form.register('breakfast_price')}
					type="number"
					id="breakfastPrice"
					aria-invalid={formErrors.breakfast_price ? 'true' : 'false'}
					disabled={updateSettingsMutation.isLoading}
				/>
			</FormControl>
			<Button $size="large" disabled={updateSettingsMutation.isLoading}>
				{updateSettingsMutation.isLoading ? <SpinnerMini /> : 'Update Settings'}
			</Button>
			{updateSettingsMutation.isError && <p>{updateSettingsMutation.error.message}</p>}
		</Form>
	);
}

export default UpdateSettingsForm;
