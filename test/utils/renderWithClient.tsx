import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';

export const createTestQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                staleTime: 0,
                gcTime: 0
            },
        },
    });

export const renderWithClient = (ui: React.ReactNode) => {
    const client = createTestQueryClient();

    return render(
        <QueryClientProvider client={client}>
            {ui}
        </QueryClientProvider>
    );
};