import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: true,
      refetchOnReconnect: true,
      retry: false,
      // staleTime: twentyFourHoursInMs,
    },
  },
})
//const msalInstance = new PublicClientApplication(msalConfig);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <MsalProvider instance={msalInstance}> */}
      <QueryClientProvider client={queryClient}>
        <Router>
          <App />
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    {/* </MsalProvider> */}
  </React.StrictMode>
);
