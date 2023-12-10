import { isFocusable } from '@/utils/helpers';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function useModal() {
	const [shouldShowModal, setShouldShowModal] = useState(false);
	const modalTriggerElementRef = useRef<HTMLElement | null>(null);

	function restoreFocus(element: HTMLElement) {
		element.focus();
	}

	function openModal() {
		if (isFocusable(document.activeElement)) {
			modalTriggerElementRef.current = document.activeElement;
		}
		setShouldShowModal(true);
	}

	const closeModal = useCallback(() => {
		if (modalTriggerElementRef.current) {
			restoreFocus(modalTriggerElementRef.current);
		}
		setShouldShowModal(false);
	}, []);

	useEffect(() => {
		function handleEscapeKeypress(e: KeyboardEvent) {
			if (e.key !== 'Escape') return;
			closeModal();
		}

		document.addEventListener('keydown', handleEscapeKeypress);

		return () => {
			document.removeEventListener('keydown', handleEscapeKeypress);
		};
	}, [closeModal]);

	return { shouldShowModal, openModal, closeModal };
}
