import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        // Use a single approach - either all eager or all dynamic
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
        // First try the exact path
        if (pages[`./Pages/${name}.jsx`]) {
            return pages[`./Pages/${name}.jsx`];
        }
        // Then try the Common directory
        if (pages[`./Pages/Common/${name}.jsx`]) {
            return pages[`./Pages/Common/${name}.jsx`];
        }
        // If not found in our eager imports, return a custom error page or null
        console.error(`Page ${name} not found`);
        return pages['./Pages/Error.jsx'] || null;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
