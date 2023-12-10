import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { HiXMark } from 'react-icons/hi2';

import { Button } from '@/ui/button/Button';
import { createUniqueId, getFocusableElements } from '@/utils/helpers';
import Heading from './Heading';
import React, { useEffect } from 'react';
import useFocusTrap from '@/hooks/useFocusTrap';

interface ModalProps {
	title: string;
	closeModal: () => void;
	children: React.ReactNode;
}

export default function Modal({ title, closeModal, children }: ModalProps) {
	const modalId = createUniqueId();
	const modalRef = useFocusTrap<HTMLDivElement>();

	useEffect(() => {
		function moveFocusInsideModal() {
			if (!modalRef.current) return;
			const focusableElements = getFocusableElements(modalRef.current);
			focusableElements[0].focus();
		}

		moveFocusInsideModal();
	}, [modalRef]);

	function closeModalOnOverlayClick(e: React.MouseEvent) {
		const targetElement = e.target as HTMLElement;

		if (targetElement.closest(`#${modalId}`)) return;

		closeModal();
	}

	return ReactDOM.createPortal(
		<Overlay onClick={closeModalOnOverlayClick}>
			<Container
				id={modalId}
				role="dialog"
				aria-modal="true"
				aria-labelledby={`${modalId}_modalTitle`}
				ref={modalRef}
			>
				<Header>
					<Heading as="h2" id={`${modalId}_modalTitle`}>
						{title}
					</Heading>
					<CloseIconButton aria-labelledby={`${modalId}_closeModalButton`} onClick={closeModal}>
						<span className="sr-only" id={`${modalId}_closeModalButton`}>
							Close modal
						</span>
						<HiXMark />
					</CloseIconButton>
				</Header>
				<Body>{children}</Body>
				<Footer>
					<Button $variant="danger" onClick={closeModal}>
						Close
					</Button>
				</Footer>
			</Container>
		</Overlay>,
		document.body
	);
}

const Overlay = styled.div`
	--padding: 3rem;
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	padding: var(--padding);
	width: 100%;
	min-height: 100vh;
	min-height: 100svh;
	background-color: var(--backdrop-color);
	backdrop-filter: blur(4px);
	z-index: 1000;
`;

const Container = styled.div`
	max-height: calc(100vh - 2 * var(--padding));
	width: 100%;
	max-width: 55rem;
	padding: 3rem;
	background-color: var(--color-grey-0);
	border-radius: var(--border-radius-lg);
	box-shadow: var(--shadow-lg);
	overflow-y: auto;
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
`;

const Body = styled.div``;

const Footer = styled.div`
	text-align: right;
`;

const CloseIconButton = styled.button`
	border: none;
	padding: 0.4rem;
	border-radius: var(--border-radius-sm);

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		fill: var(--color-grey-500);
	}
`;
