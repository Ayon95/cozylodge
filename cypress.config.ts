import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		setupNodeEvents(on) {
			// Enable console.log() in tests
			on('task', {
				log(message) {
					console.log(message);
					return null;
				},
			});
		},
		baseUrl: 'http://localhost:5173',
	},
});
