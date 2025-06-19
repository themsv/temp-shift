import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import RootProvider from './providers/RootProvider';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootProvider />
  </StrictMode>,
);
