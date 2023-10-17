import SignupForm from '@/features/authentication/SignupForm';
import Heading from '@/ui/Heading';
import LinkText from '@/ui/LinkText';

function Signup() {
	return (
		<>
			<Heading>Create an account</Heading>
			<SignupForm />
			<p className="text-center">
				Already have an account? <LinkText to="/login">Log in</LinkText>
			</p>
		</>
	);
}

export default Signup;
