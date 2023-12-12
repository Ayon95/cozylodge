import { Button } from '@/ui/button/Button';
import styled from 'styled-components';

import Modal from './Modal';

export interface ConfirmDeleteModalProps {
	resourceName: string;
	onConfirmDelete: () => void;
	onCloseModal: () => void;
	isDeleting: boolean;
}

export default function ConfirmDeleteModal({
	resourceName,
	onConfirmDelete,
	onCloseModal,
	isDeleting,
}: ConfirmDeleteModalProps) {
	return (
		<Modal
			title="Are you sure you want to delete?"
			onCloseModal={onCloseModal}
			extraFooterButtons={
				<Button $variant="danger" onClick={onConfirmDelete} disabled={isDeleting}>
					Delete
				</Button>
			}
		>
			<Description>
				This action cannot be undone. This will permanently delete {resourceName}.
			</Description>
		</Modal>
	);
}

const Description = styled.p`
	margin: 1rem 0;
`;
