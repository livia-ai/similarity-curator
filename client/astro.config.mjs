import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

export default defineConfig({
  // output: 'server',
  // adapter: node({
  //   mode: 'standalone'
  // }),
  // server: {
  //   port: 3001
  // },
	integrations: [svelte(), tailwind()],
	vite: {
    ssr: {
      external: ['svgo']
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    }
  }
});
