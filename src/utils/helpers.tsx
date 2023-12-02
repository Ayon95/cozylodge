export function formatPrice(value: number) {
	return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export function createUniqueId() {
	return Date.now().toString(36) + Math.random().toString(36).slice(2);
}
