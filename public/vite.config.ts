import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve'

export default defineConfig({
  plugins: [
    solidPlugin(),
  ],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3030',
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    target: 'esnext',
  },
});
