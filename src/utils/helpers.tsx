import { SortDirections } from '@/types/sort';
import { FieldValues } from 'react-hook-form';

export function formatPrice(value: number) {
	return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export function formatDate(
	dateString: string,
	options: Intl.DateTimeFormatOptions = { dateStyle: 'medium' }
) {
	const dateObj = new Date(dateString);
	const utcDate = new Date(
		dateObj.getUTCFullYear(),
		dateObj.getUTCMonth(),
		dateObj.getUTCDate(),
		dateObj.getUTCHours(),
		dateObj.getUTCMinutes()
	);
	return new Intl.DateTimeFormat('en-US', options).format(utcDate);
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

export function createObjectCompareFunction<T extends Record<keyof T, unknown>>(
	sortBy: keyof T,
	sortDirection: SortDirections
) {
	const modifier = sortDirection === 'asc' ? 1 : -1;

	return function (object1: T, object2: T): number {
		const value1 = object1[sortBy];
		const value2 = object2[sortBy];

		if (value1 === value2) return 0;

		// Accounting for possible null values
		// null values will be placed at the end
		if (value1 === null) return 1;
		if (value2 === null) return -1;

		if (typeof value1 === 'string') {
			// Sort by date if the values are valid date strings
			const dateValue1 = Date.parse(value1);
			const dateValue2 = Date.parse(value2 as string);

			if (!Number.isNaN(dateValue1)) {
				return (dateValue1 - dateValue2) * modifier;
			}

			return value1.localeCompare(value2 as string) * modifier;
		}

		if (typeof value1 === 'number') {
			return (value1 - (value2 as number)) * modifier;
		}

		if (typeof value1 === 'boolean') {
			return value1.toString().localeCompare((value2 as boolean).toString()) * modifier;
		}

		return 0;
	};
}
