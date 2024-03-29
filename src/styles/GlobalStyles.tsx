import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

/* Colors adapted from https://tailwindcss.com/docs/customizing-colors */

:root {
  /* Emerald */
  --color-brand-50: #ecfdf5;
  --color-brand-100: #d1fae5;
  --color-brand-200: #a7f3d0;
  --color-brand-500: #10b981;
  --color-brand-600: #059669;
  --color-brand-700: #047857;
  --color-brand-800: #065f46;
  --color-brand-900: #064e3b;

  /* Grey */
  --color-grey-0: #fff;
  --color-grey-50: #f9fafb;
  --color-grey-100: #f3f4f6;
  --color-grey-200: #e5e7eb;
  --color-grey-300: #d1d5db;
  --color-grey-400: #9ca3af;
  --color-grey-500: #6b7280;
  --color-grey-600: #4b5563;
  --color-grey-700: #374151;
  --color-grey-800: #1f2937;
  --color-grey-900: #111827;

  --color-blue-100: #e0f2fe;
  --color-blue-700: #0369a1;
  --color-green-100: #dcfce7;
  --color-green-700: #15803d;
  --color-yellow-100: #fef9c3;
  --color-yellow-700: #a16207;
  --color-silver-100: #e5e7eb;
  --color-silver-700: #374151;
  --color-indigo-100: #e0e7ff;
  --color-indigo-700: #4338ca;

  --color-red-100: #fee2e2;
  --color-red-600: #dc2626;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;

  --color-btn-primary: var(--color-brand-500);
  --color-btn-primary-dark: var(--color-brand-600);
  --color-btn-secondary: var(--color-grey-100);
  --color-btn-secondary-dark: var(--color-grey-200);
  --color-btn-danger: var(--color-red-600);
  --color-btn-danger-dark: var(--color-red-700);

  --font-color-btn-secondary: var(--color-grey-600);

  --fontSize-base: 1.6rem;
  --fontSize-sm: calc(var(--fontSize-base) - 0.2rem);

  --fontFamily-numeric: 'Sono', monospace;

  --backdrop-color: rgba(0, 0, 0, 0.3);

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;

  /* For dark mode */
  --image-grayscale: 0;
  --image-opacity: 100%;
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}

html {
  box-sizing: border-box;
  font-size: 62.5%;
}

body {
  font-family: "Raleway", sans-serif;
  color: var(--color-grey-700);
  font-weight: 500;

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  min-height: 100svh;
  line-height: 1.5;
  font-size: var(--fontSize-base);
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

:focus:not(:focus-visible) {
  outline: none;
}

:focus-visible {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}

button:focus-visible {
  outline-offset: 3px;
}

input:not(input[type="file"]),
textarea {
  padding: 0.45em 0.9em;
	border: 1px solid var(--color-grey-300);
	border-radius: var(--border-radius-sm);
	box-shadow: var(--shadow-sm);
}

button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

/*
FOR DARK MODE

--color-grey-0: #18212f;
--color-grey-50: #111827;
--color-grey-100: #1f2937;
--color-grey-200: #374151;
--color-grey-300: #4b5563;
--color-grey-400: #6b7280;
--color-grey-500: #9ca3af;
--color-grey-600: #d1d5db;
--color-grey-700: #e5e7eb;
--color-grey-800: #f3f4f6;
--color-grey-900: #f9fafb;

--color-blue-100: #075985;
--color-blue-700: #e0f2fe;
--color-green-100: #166534;
--color-green-700: #dcfce7;
--color-yellow-100: #854d0e;
--color-yellow-700: #fef9c3;
--color-silver-100: #374151;
--color-silver-700: #f3f4f6;
--color-indigo-100: #3730a3;
--color-indigo-700: #e0e7ff;

--color-red-100: #fee2e2;
--color-red-700: #b91c1c;
--color-red-800: #991b1b;

--backdrop-color: rgba(0, 0, 0, 0.3);

--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
--shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
--shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

--image-grayscale: 10%;
--image-opacity: 90%;
*/

/* Utilities */
.sr-only {
  position: absolute;
  top: auto;
  width: 1px;
  height: 1px;
  clip: rect(1px 1px 1px 1px); /* IE 6/7 */
  clip: rect(1px, 1px, 1px, 1px);
  overflow: hidden;
  white-space: nowrap;
}

.mt-1 {
  margin-top: 1rem;
}

.mt-3 {
  margin-top: 3rem;
}

.mb-1 {
  margin-bottom: 1rem;
}

.text-sm {
  font-size: var(--fontSize-sm);
}

.text-center {
  text-align: center;
}

.fw-semi-bold {
  font-weight: 600;
}

.full-width {
  width: 100%;
}

.multi-col-input-container {
  display: grid;
	grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
	gap: 1rem;
	align-items: start;
}
`;
