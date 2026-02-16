import '../css/app.css';
import './echo'
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const toTitleCase = (value: string) =>
    value
        .split('-')
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
const getFallbackPageTitle = () => {
    const cleanPath = window.location.pathname.replace(/^\/+|\/+$/g, '');

    if (!cleanPath) {
        return 'Beranda';
    }

    return cleanPath
        .split('/')
        .filter(Boolean)
        .map(toTitleCase)
        .join(' - ');
};

createInertiaApp({
    title: (title) => `${(title && title.trim()) || getFallbackPageTitle()} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.jsx`, import.meta.glob('./pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
