import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { FormDataProvider } from '@/context/FormDataContext';
import App from '@/App';
import '@/styles/index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <FormDataProvider>
            <App />
        </FormDataProvider>
    </StrictMode>,
);
