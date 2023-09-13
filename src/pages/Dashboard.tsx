import FlexRow from '@/ui/FlexRow';
import Heading from '../ui/Heading';
import { useEffect } from 'react';
import { getCabins } from '@/services/apiCabins';

function Dashboard() {
	useEffect(() => {
		getCabins().then(data => console.log(data));
	}, []);
	return (
		<FlexRow>
			<Heading as="h1">Dashboard</Heading>
		</FlexRow>
	);
}

export default Dashboard;
