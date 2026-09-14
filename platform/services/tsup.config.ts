import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/**/index.ts'],
  format: ['esm'],
  dts: false,
  outDir: 'dist',
  tsconfig: './tsconfig.json',
  external: ['@modelescrow/core', 'fastify', 'jsonwebtoken'],
});
