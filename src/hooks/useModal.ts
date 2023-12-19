import { isFocusable } from '@/utils/helpers';
import { useRef, useState } from 'react';

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

	function closeModal() {
		if (modalTriggerElementRef.current) {
			restoreFocus(modalTriggerElementRef.current);
		}
		setShouldShowModal(false);
	}

	return { shouldShowModal, openModal, closeModal };
}
