import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';

export function renderWithQueryClient(ui: React.ReactElement) {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
		logger: {
			log: console.log,
			warn: console.warn,
			// No errors will be logged to the console
			error: () => {},
		},
	});

	return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
}
