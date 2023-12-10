export function formatPrice(value: number) {
	return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export function createUniqueId() {
	return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function getFocusableElements(container: HTMLElement) {
	return container.querySelectorAll<HTMLElement>(
		'button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), tabindex:not([tabindex="-1"])'
	);
}

export function isFocusable(element: Element | null): element is HTMLElement {
	return element instanceof HTMLElement;
}
