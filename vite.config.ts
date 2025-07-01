import { tanstackRouter } from '@tanstack/router-plugin/vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-oxc';
import { visualizer } from 'rollup-plugin-visualizer';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // Please make sure that '@tanstack/router-plugin' is passed before '@vitejs/plugin-react'
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    react(),
    tsconfigPaths(),
    visualizer({
      open: true,
      filename: 'build-stats.html',
    }), // alway at end
  ],
  server: {
    port: 8080, // ✅ Change dev server port here
    host: '0.0.0.0', // optional: allows access from network IP,
    allowedHosts: ['style-counsel.azurewebsites.net'],
  },
});
