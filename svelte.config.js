import sveltePreprocess from "svelte-preprocess";

import netlify from "@sveltejs/adapter-netlify";

/** @type {import('@sveltejs/kit').Config} */
export default {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    sveltePreprocess({
      postcss: true,
    }),
  ],
  kit: {
    // By default, `npm run build` will create a standard Node app.
    // You can create optimized builds for different platforms by
    // specifying a different adapter
    adapter: netlify(),

    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",

    vite: {
      server: {
        hmr: {
          clientPort: process.env.HMR_HOST ? 443 : 24678,
          host: process.env.HMR_HOST
            ? process.env.HMR_HOST.substring("https://".length)
            : "localhost",
        },
      },
    },
  },
};
