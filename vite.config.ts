import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          // Conditionally enable React Compiler
          process.env.VITE_ENABLE_COMPILER === 'true' 
            ? ['babel-plugin-react-compiler', {
                runtimeModule: 'react-compiler-runtime',
              }]
            : null,
        ].filter(Boolean),
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
