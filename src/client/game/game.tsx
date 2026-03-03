import '../index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Layout } from '../UI/Layout';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Layout className="overflow-hidden" image="water">
      <App />
    </Layout>
  </StrictMode>
);
