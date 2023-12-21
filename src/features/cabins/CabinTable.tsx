import { useState } from 'react';

import CabinRow from './CabinRow';
import { Tables } from '@/types/database';
import useModal from '@/hooks/useModal';
import ConfirmDeleteModal from '@/ui/Modal/ConfirmDeleteModal';
import { useDeleteCabin } from './hooks/useDeleteCabin';
import Modal from '@/ui/Modal/Modal';
import UpdateCabinForm from './UpdateCabinForm';
import Table from '@/ui/Table';

interface CabinTableProps {
	cabins: Tables<'cabin'>[];
}

function CabinTable({ cabins }: CabinTableProps) {
	const [selectedCabin, setSelectedCabin] = useState<null | Tables<'cabin'>>(null);

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

	function showUpdateModalForSelectedCabin(cabin: Tables<'cabin'>) {
		setSelectedCabin(cabin);
		openUpdateModal();
	}

	function showConfirmDeleteModalForSelectedCabin(cabin: Tables<'cabin'>) {
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
					{cabins.map(cabin => (
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
