// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import fetch from 'cross-fetch';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

import { mockServer } from './src/test/mocks/server';

// fetch polyfill for Node environment
global.fetch = fetch;

// Mocking window.matchMedia() since it is not implemented in JSDOM
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: vi.fn().mockImplementation(query => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(), // deprecated
		removeListener: vi.fn(), // deprecated
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
});

beforeAll(() => mockServer.listen());
afterEach(() => {
	cleanup();
	mockServer.resetHandlers();
});
afterAll(() => mockServer.close());
