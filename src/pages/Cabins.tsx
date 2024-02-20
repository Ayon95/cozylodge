import CabinTable from '@/features/cabins/CabinTable';
import FlexRow from '@/ui/FlexRow';
import Heading from '@/ui/Heading';
import Spinner from '@/ui/spinner/Spinner';
import { useCabins } from '@/features/cabins/hooks/useCabins';
import CreateCabinForm from '@/features/cabins/CreateCabinForm';
import { useUser } from '@/features/authentication/hooks/useUser';
import CabinFilterAndSortControls from '@/features/cabins/CabinFilterAndSortControls';

function Cabins() {
	const { data: user } = useUser();
	const { data: cabins, isLoading } = useCabins(user?.id);

	return (
		<>
			<FlexRow>
				<Heading as="h1">Cabins</Heading>
				<CabinFilterAndSortControls />
			</FlexRow>
			{isLoading ? (
				<Spinner />
			) : cabins && cabins.length > 0 ? (
				<CabinTable cabins={cabins} />
			) : (
				<p className="mt-1">No cabins to show</p>
			)}
			<Heading as="h2" className="mt-3">
				Create a cabin
			</Heading>
			{user && <CreateCabinForm userId={user.id} />}
		</>
	);
}

export default Cabins;
