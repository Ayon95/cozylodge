import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import CabinRow from './CabinRow';
import { Tables } from '@/types/database';
import useModal from '@/hooks/useModal';
import ConfirmDeleteModal from '@/ui/Modal/ConfirmDeleteModal';
import { useDeleteCabin } from './hooks/useDeleteCabin';
import Modal from '@/ui/Modal/Modal';
import UpdateCabinForm from './UpdateCabinForm';
import Table from '@/ui/Table';
import { CabinFields } from '@/types/cabins';
import { createObjectCompareFunction } from '@/utils/helpers';
import { SortDirections } from '@/types/sort';

type Cabin = Tables<'cabin'>;

interface CabinTableProps {
	cabins: Cabin[];
}

function CabinTable({ cabins }: CabinTableProps) {
	const [selectedCabin, setSelectedCabin] = useState<null | Cabin>(null);
	const [searchParams] = useSearchParams();

	const discountFilterValue = searchParams.get('discount');
	const sortValue = searchParams.get('sort');

	const filteredCabins = discountFilterValue ? getFilteredCabins() : cabins;
	const sortedCabins = getSortedCabins(filteredCabins);

	function getFilteredCabins() {
		return cabins.filter(cabin => {
			if (discountFilterValue === 'true') {
				return cabin.discount !== null && cabin.discount > 0;
			}
			if (discountFilterValue === 'false') {
				return cabin.discount === null || cabin.discount === 0;
			}
		});
	}

	function getSortedCabins(cabins: Cabin[]) {
		if (sortValue) {
			const [sortBy, sortDirection] = sortValue.split('-');
			const compareFunction = createObjectCompareFunction<Cabin>(
				sortBy as CabinFields,
				sortDirection as SortDirections
			);

			return [...cabins].sort(compareFunction);
		}
		return cabins;
	}

	const {
		shouldShowModal: shouldShowUpdateModal,
		closeModal: closeUpdateModal,
		openModal: openUpdateModal,
	} = useModal();

	const {
		shouldShowModal: shouldShowConfirmDeleteModal,
		closeModal: closeConfirmDeleteModal,
		openModal: openConfirmDeleteModal,
	} = useModal();

	const deleteCabinMutation = useDeleteCabin();

	function closeUpdateModalForSelectedCabin() {
		setSelectedCabin(null);
		closeUpdateModal();
	}

	function closeConfirmDeleteModalForSelectedCabin() {
		setSelectedCabin(null);
		closeConfirmDeleteModal();
	}

	function deleteSelectedCabin() {
		if (selectedCabin) {
			deleteCabinMutation.mutate(selectedCabin.id);
			closeConfirmDeleteModalForSelectedCabin();
		}
	}

	function showUpdateModalForSelectedCabin(cabin: Cabin) {
		setSelectedCabin(cabin);
		openUpdateModal();
	}

	function showConfirmDeleteModalForSelectedCabin(cabin: Cabin) {
		setSelectedCabin(cabin);
		openConfirmDeleteModal();
	}
	return (
		<>
			<Table id="cabinTable" caption="Cabins available at CozyLodge">
				<Table.Head>
					<Table.Row>
						<Table.HeaderCell>
							<span className="sr-only">Image</span>
						</Table.HeaderCell>
						<Table.HeaderCell>Cabin</Table.HeaderCell>
						<Table.HeaderCell>Capacity</Table.HeaderCell>
						<Table.HeaderCell>Price</Table.HeaderCell>
						<Table.HeaderCell>Discount</Table.HeaderCell>
						<Table.HeaderCell>
							<span className="sr-only">Actions</span>
						</Table.HeaderCell>
					</Table.Row>
				</Table.Head>
				<Table.Body>
					{sortedCabins.map(cabin => (
						<CabinRow
							cabin={cabin}
							key={cabin.id}
							onClickUpdate={showUpdateModalForSelectedCabin}
							onClickDelete={showConfirmDeleteModalForSelectedCabin}
						/>
					))}
				</Table.Body>
			</Table>
			{selectedCabin && shouldShowUpdateModal && (
				<Modal title="Update cabin" onCloseModal={closeUpdateModalForSelectedCabin}>
					<UpdateCabinForm cabin={selectedCabin} onUpdate={closeUpdateModal} />
				</Modal>
			)}
			{selectedCabin && shouldShowConfirmDeleteModal && (
				<ConfirmDeleteModal
					resourceName={`cabin ${selectedCabin.name}`}
					onConfirmDelete={deleteSelectedCabin}
					onCloseModal={closeConfirmDeleteModalForSelectedCabin}
					isDeleting={deleteCabinMutation.isLoading}
				/>
			)}
		</>
	);
}

export default CabinTable;
