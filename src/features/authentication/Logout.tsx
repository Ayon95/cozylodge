import { HiOutlineArrowRightOnRectangle } from 'react-icons/hi2';
import { useLogout } from './hooks/useLogout';
import SpinnerMini from '@/ui/spinner/SpinnerMini';
import ButtonIconText from '@/ui/button/ButtonIconText';

function Logout() {
	const { mutate, isLoading } = useLogout();
	return (
		<ButtonIconText onClick={() => mutate()} disabled={isLoading}>
			{isLoading ? (
				<SpinnerMini aria-hidden="true" />
			) : (
				<HiOutlineArrowRightOnRectangle aria-hidden="true" />
			)}
			<span>Logout</span>
		</ButtonIconText>
	);
}

export default Logout;
