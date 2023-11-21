import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/ui/button/Button';
import Form from '@/ui/form/Form';
import FormControl from '@/ui/form/FormControl';
import SpinnerMini from '@/ui/spinner/SpinnerMini';
import { MIN_PASSWORD_LENGTH } from '@/utils/constants';
import { useLogin } from './hooks/useLogin';

const formSchema = z.object({
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
});

type FormData = z.infer<typeof formSchema>;

function LoginForm() {
	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});
	const formErrors = form.formState.errors;

	const loginMutation = useLogin();

	function handleSubmit(formData: FormData) {
		const { email, password } = formData;
		loginMutation.mutate({ email, password });
	}

	return (
		<Form onSubmit={form.handleSubmit(handleSubmit)} aria-labelledby="loginFormLabel" noValidate>
			<span className="sr-only" id="loginFormLabel">
				Login
			</span>
			<FormControl
				labelInfo={{ label: 'Email Address', inputId: 'email' }}
				error={formErrors.email?.message}
			>
				<input
					{...form.register('email')}
					type="email"
					id="email"
					// This makes this form better for password managers
					autoComplete="username"
					disabled={loginMutation.isLoading}
					placeholder="user@example.com"
					aria-invalid={formErrors.email ? 'true' : 'false'}
				/>
			</FormControl>
			<FormControl
				labelInfo={{ label: 'Password', inputId: 'password' }}
				error={formErrors.password?.message}
			>
				<input
					{...form.register('password')}
					type="password"
					id="password"
					autoComplete="current-password"
					disabled={loginMutation.isLoading}
					aria-invalid={formErrors.password ? 'true' : 'false'}
				/>
			</FormControl>
			<FormControl>
				<Button size="large" disabled={loginMutation.isLoading}>
					{loginMutation.isLoading ? <SpinnerMini /> : 'Login'}
				</Button>
			</FormControl>
		</Form>
	);
}

export default LoginForm;
