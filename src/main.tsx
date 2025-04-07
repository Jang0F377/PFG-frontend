import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import IndexRoutes from './index.routes.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@common/utils/http/queryClient';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <IndexRoutes />
    </QueryClientProvider>
  </StrictMode>,
);
