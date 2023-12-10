import { getFocusableElements } from '@/utils/helpers';
import { useEffect, useRef } from 'react';

export default function useFocusTrap<T extends HTMLElement>() {
	const elementRef = useRef<T>(null);

	useEffect(() => {
		if (!elementRef.current) return;

		const element = elementRef.current;

		const focusableElements = getFocusableElements(element);

		const firstFocusableElement = focusableElements[0];
		const lastFocusableElement = focusableElements[focusableElements.length - 1];

		function handleTabKeypress(e: KeyboardEvent) {
			if (e.key !== 'Tab') return;

			// Shift + Tab was pressed and focus is on the first element -> move focus to the last element
			if (e.shiftKey && document.activeElement === firstFocusableElement) {
				lastFocusableElement.focus();
				e.preventDefault();
				// Tab was pressed and focus is on the last element -> move focus to the first element
			} else if (!e.shiftKey && document.activeElement === lastFocusableElement) {
				firstFocusableElement.focus();
				e.preventDefault();
			}
		}

		element.addEventListener('keydown', handleTabKeypress);

		return () => {
			element.removeEventListener('keydown', handleTabKeypress);
		};
	}, []);

	return elementRef;
}
