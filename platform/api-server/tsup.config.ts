import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: false,
  outDir: 'dist',
  tsconfig: './tsconfig.json',
  sourcemap: true,
  external: [
    '@modelescrow/core',
    '@modelescrow/services',
    '@modelescrow/adapters',
    '@aws-sdk/client-dynamodb',
    '@aws-sdk/lib-dynamodb',
    '@aws-sdk/credential-providers',
    '@aws-sdk/types',
    'fastify',
    '@fastify/cors',
    '@fastify/helmet',
    '@fastify/jwt',
    'dotenv',
    'jsonwebtoken',
    'zod',
    '@zodios/core',
  ],
});
