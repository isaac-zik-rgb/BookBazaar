import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],

  resolve: {
    alias: {
      components: '/src/components',
      pages: '/src/pages',
      styles: '/src/styles',
      utils: '/src/utils',
      helpers: '/src/helpers',
      hooks: '/src/hooks',
      types: '/src/types',
      assets: '/src/assets',
      config: '/src/config',
      services: '/src/services',
      store: '/src/store',
      routes: '/src/routes',
    },
  },

  preview: {
    host: true,
    port: 8080,
  },
});
