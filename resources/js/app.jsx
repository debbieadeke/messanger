import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { EventBusProvider } from './EventBus'; // Same directory level
import Home from './Pages/Home.jsx'; // Adjust the path if necessary


const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<EventBusProvider>
            <App {...props} />
        </EventBusProvider>);

 
    },
    progress: {
        color: '#4B5563',
    },
});
