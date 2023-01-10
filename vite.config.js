import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    server: {
        hmr: {
            host: 'localhost'
        }
    },
    plugins: [
        laravel({
            input: ['resources/js/app.js'],
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': '/resources/js',
            '@components': '/resources/js/src/components',
            '@contexts': '/resources/js/src/contexts',
            '@services': '/resources/js/src/services',
            '@layouts': '/resources/js/src/layouts',
            '@hooks': '/resources/js/src/hooks',
            '@hocs': '/resources/js/src/hocs',
            '@pages': '/resources/js/src/pages',
        }
    }
});
