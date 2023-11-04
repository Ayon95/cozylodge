import CabinTable from '@/features/cabins/CabinTable';
import FlexRow from '@/ui/FlexRow';
import Heading from '@/ui/Heading';
import Spinner from '@/ui/spinner/Spinner';
import { useCabins } from '@/features/cabins/hooks/useCabins';

function Cabins() {
	const { data: cabins, isLoading } = useCabins();
	return (
		<>
			<FlexRow>
				<Heading as="h1">Cabins</Heading>
				<span>Filter / Sort</span>
			</FlexRow>
			{isLoading && <Spinner />}
			{cabins && cabins.length > 0 ? (
				<CabinTable cabins={cabins} />
			) : (
				<p className="mt-1">No cabins to show</p>
			)}
		</>
	);
}

export default Cabins;
