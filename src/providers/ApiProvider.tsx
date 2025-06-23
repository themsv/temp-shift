import { type PropsWithChildren, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';
import URLS from '@app/consts/urls';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
    mutations: {
      retry: 1,
      onError(error) {
        console.error('Global Mutation Error:', error);
      },
    },
  },
});

function ApiProvider({ children }: Readonly<PropsWithChildren>) {
  useEffect(() => {
    // Set default headers
    axios.defaults.headers.common['Accept'] = 'application/json';
    axios.defaults.headers.common['Cache-Control'] = 'no-cache';
    axios.defaults.headers['Content-Type'] = 'application/json';
    // if the APIs need timezone
    // axios.defaults.headers.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    axios.defaults.baseURL = URLS.base;
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default ApiProvider;
