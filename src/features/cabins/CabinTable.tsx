import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import Spinner from '@/ui/spinner/Spinner';
import TableRow from './CabinRow';
import { getCabins } from '@/services/apiCabins';

function CabinTable() {
	const { data: cabins, isLoading } = useQuery({ queryKey: ['cabins'], queryFn: getCabins });

	if (isLoading) return <Spinner />;

	return (
		<TableContainer role="region" tabIndex={0} aria-labelledby="cabinTableCaption">
			<Table role="table">
				<caption className="sr-only" id="cabinTableCaption" role="caption">
					Cabins available at CozyLodge
				</caption>
				<thead role="rowgroup">
					<tr role="row">
						<th role="columnheader">
							<span className="sr-only">Image</span>
						</th>
						<th role="columnheader">Cabin</th>
						<th role="columnheader">Capacity</th>
						<th role="columnheader">Price</th>
						<th role="columnheader">Discount</th>
					</tr>
				</thead>
				<tbody role="rowgroup">
					{cabins?.map(cabin => (
						<TableRow cabin={cabin} key={cabin.id} />
					))}
				</tbody>
			</Table>
		</TableContainer>
	);
}

export default CabinTable;

const TableContainer = styled.div`
	margin-top: 1rem;
`;

const Table = styled.table`
	width: 100%;
	padding: 1rem;
	background-color: var(--color-grey-0);
	border-collapse: collapse;
	border: 1px solid var(--color-grey-200);
	border-radius: var(--border-radius-md);
	font-size: 1.4rem;
	overflow: hidden;

	thead {
		background-color: var(--color-grey-50);
		border-bottom: 1px solid var(--color-grey-100);
		text-align: left;
		text-transform: uppercase;
		letter-spacing: 0.4px;
		color: var(--color-grey-600);
	}

	th,
	td {
		padding: 1.2rem;
	}

	td img {
		border-radius: var(--border-radius-sm);
	}

	@media only screen and (max-width: 62.5em) {
		thead {
			display: none;
		}

		td {
			display: grid;
			grid-template-columns: 10ch auto;
		}

		td img {
			grid-column: 1/-1;
		}

		td:not(:first-child)::before {
			content: attr(data-cell) ': ';
			font-weight: bold;
			text-transform: capitalize;
		}
	}
`;
