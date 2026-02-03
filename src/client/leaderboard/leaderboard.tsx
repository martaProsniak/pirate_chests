import '../index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Layout } from '../UI/Layout';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Layout>
      <div>Ahoy matey</div>
    </Layout>
  </StrictMode>
);
