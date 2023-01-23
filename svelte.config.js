import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
    preprocess: vitePreprocess(),
	onwarn: (warning, handler) => {
	    const { code, frame } = warning

	    if (code === "css-unused-selector")
		    return
  
	    handler(warning)
	},
	kit: {
		adapter: adapter()
		// ,
		// target: '#svelte',
		// vite: {
		//     resolve: {
		//         alias: {
		//             $api: resolve('./api/')
		//         }
		//     }
		// }
	}
};

export default config;
