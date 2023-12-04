import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./vitest.setup.ts'],
	},
	resolve: {
		alias: {
			'@/features': path.resolve(__dirname, 'src/features'),
			'@/hooks': path.resolve(__dirname, 'src/hooks'),
			'@/pages': path.resolve(__dirname, 'src/pages'),
			'@/ui': path.resolve(__dirname, 'src/ui'),
			'@/utils': path.resolve(__dirname, 'src/utils'),
			'@/data': path.resolve(__dirname, 'src/data'),
			'@/services': path.resolve(__dirname, 'src/services'),
			'@/styles': path.resolve(__dirname, 'src/styles'),
			'@/types': path.resolve(__dirname, 'src/types'),
			'@/test': path.resolve(__dirname, 'src/test'),
		},
	},
	build: {
		rollupOptions: {
			external: ['src/assets/seedImages'],
		},
	},
});
