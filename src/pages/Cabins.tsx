import CabinTable from '@/features/cabins/CabinTable';
import FlexRow from '@/ui/FlexRow';
import Heading from '@/ui/Heading';

function Cabins() {
	return (
		<>
			<FlexRow>
				<Heading as="h1">Cabins</Heading>
				<span>Filter / Sort</span>
			</FlexRow>
			<CabinTable />
		</>
	);
}

export default Cabins;
