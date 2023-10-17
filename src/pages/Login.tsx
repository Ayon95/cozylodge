import LoginForm from '@/features/authentication/LoginForm';
import Heading from '@/ui/Heading';
import LinkText from '@/ui/LinkText';

function Login() {
	return (
		<>
			<Heading>Log in to your account</Heading>
			<LoginForm />
			<p className="text-center">
				Don't have an account? <LinkText to="/signup">Sign up</LinkText>
			</p>
		</>
	);
}

export default Login;
