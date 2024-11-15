import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';

import './index.css';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: Infinity,
        },
    },
});

const container = document.getElementById('root');
if (!container) {
    throw new Error('No root element found');
}
const root = createRoot(container);
root.render(
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <App />
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
);
