import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/ui/button/Button';
import Form from '@/ui/form/Form';
import Input from '../../ui/form/Input';
import FormControl from '@/ui/form/FormControl';
import SpinnerMini from '@/ui/spinner/SpinnerMini';
import { MIN_FULL_NAME_LENGTH, MIN_PASSWORD_LENGTH } from '@/utils/constants';
import { useSignup } from './hooks/useSignup';

const formSchema = z
	.object({
		fullName: z
			.string()
			.nonempty({ message: 'Full name is required' })
			.min(MIN_FULL_NAME_LENGTH, {
				message: `Full name must have at least ${MIN_FULL_NAME_LENGTH} characters`,
			}),
		email: z
			.string()
			.nonempty({ message: 'Email is required' })
			.email({ message: 'Invalid email address' }),
		password: z
			.string()
			.nonempty({ message: 'Password is required' })
			.min(MIN_PASSWORD_LENGTH, {
				message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
			}),
		confirmPassword: z.string(),
	})
	.refine(values => values.password === values.confirmPassword, {
		message: 'Passwords must match',
		path: ['confirmPassword'],
	});

type FormData = z.infer<typeof formSchema>;

function SignupForm() {
	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fullName: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});
	const formErrors = form.formState.errors;

	const signupMutation = useSignup();

	function handleSubmit(formData: FormData) {
		const { fullName, email, password } = formData;
		signupMutation.mutate({ fullName, email, password });
	}

	return (
		<Form onSubmit={form.handleSubmit(handleSubmit)} aria-labelledby="signupFormLabel" noValidate>
			<span className="sr-only" id="signupFormLabel">
				Create an account
			</span>
			<FormControl
				labelInfo={{ label: 'Full Name', inputId: 'fullName' }}
				error={formErrors.fullName?.message}
			>
				<Input
					{...form.register('fullName')}
					type="text"
					id="fullName"
					disabled={signupMutation.isLoading}
					aria-invalid={formErrors.fullName ? 'true' : 'false'}
				/>
			</FormControl>
			<FormControl
				labelInfo={{ label: 'Email Address', inputId: 'email' }}
				error={formErrors.email?.message}
			>
				<Input
					{...form.register('email')}
					type="email"
					id="email"
					disabled={signupMutation.isLoading}
					placeholder="user@example.com"
					aria-invalid={formErrors.email ? 'true' : 'false'}
				/>
			</FormControl>
			<FormControl
				labelInfo={{ label: 'Password', inputId: 'password' }}
				error={formErrors.password?.message}
			>
				<Input
					{...form.register('password')}
					type="password"
					id="password"
					autoComplete="current-password"
					disabled={signupMutation.isLoading}
					aria-invalid={formErrors.password ? 'true' : 'false'}
				/>
			</FormControl>
			<FormControl
				labelInfo={{ label: 'Confirm Password', inputId: 'confirmPassword' }}
				error={formErrors.confirmPassword?.message}
			>
				<Input
					{...form.register('confirmPassword')}
					type="password"
					id="confirmPassword"
					disabled={signupMutation.isLoading}
					aria-invalid={formErrors.confirmPassword ? 'true' : 'false'}
				/>
			</FormControl>
			<FormControl>
				<Button size="large" disabled={signupMutation.isLoading}>
					{signupMutation.isLoading ? <SpinnerMini /> : 'Sign Up'}
				</Button>
			</FormControl>
		</Form>
	);
}

export default SignupForm;
