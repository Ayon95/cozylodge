import { HiOutlineArrowRightOnRectangle } from 'react-icons/hi2';
import styled from 'styled-components';
import { useLogout } from './hooks/useLogout';
import SpinnerMini from '@/ui/spinner/SpinnerMini';

function Logout() {
	const { mutate, isLoading } = useLogout();
	return (
		<StyledButton onClick={() => mutate()} disabled={isLoading}>
			{isLoading ? <SpinnerMini /> : <HiOutlineArrowRightOnRectangle />}
			<span>Logout</span>
		</StyledButton>
	);
}

export default Logout;

const StyledButton = styled.button`
	display: flex;
	align-items: center;
	gap: 0.4rem;
	border: none;
`;
