import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/**/index.ts'],
  format: ['esm'],
  dts: false,
  outDir: 'dist',
  tsconfig: './tsconfig.json',
  external: [
    '@modelescrow/core',
    '@modelescrow/services',
    '@aws-sdk/client-dynamodb',
    '@aws-sdk/lib-dynamodb',
    '@aws-sdk/client-s3',
    'ulid',
    'pdf-lib',
    '@pdf-lib/fontkit',
  ],
});
