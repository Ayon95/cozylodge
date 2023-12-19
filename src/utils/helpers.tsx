import { FieldValues } from 'react-hook-form';

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

export function getModifiedFormFieldValues<T extends FieldValues>(
	dirtyFields: Partial<Record<keyof T, boolean>>,
	allValues: T
) {
	return Object.keys(dirtyFields).reduce((values, currentField) => {
		return { ...values, [currentField]: allValues[currentField] };
	}, {} as Partial<T>);
}

export function getImageNameFromUrl(url: string) {
	const imageUrlParts = url.split('/');
	return imageUrlParts[imageUrlParts.length - 1];
}

export function getIdFromQueryString(url: URL) {
	const queryParams = new URL(url).searchParams;
	// ID will be in this format -> ?id=eq.1
	return Number(queryParams.get('id')?.split('.')[1]);
}
