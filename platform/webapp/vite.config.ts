import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@modelescrow/core': path.resolve(__dirname, '../../packages/core/src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/v0': 'http://127.0.0.1:4000',
      '/v1': 'http://127.0.0.1:4000',
      '/health': 'http://127.0.0.1:4000',
    },
  },
});
