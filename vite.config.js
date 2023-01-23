import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
    plugins: [sveltekit()],
    test: {
        include: ['src/**/*.{test,spec}.{js,ts}']
    },
    server: {
        fs: {
            allow: ['../connected-home/'],
        },
    },
};

export default config;
