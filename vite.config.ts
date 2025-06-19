import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // Please make sure that '@tanstack/router-plugin' is passed before '@vitejs/plugin-react'
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    react(),
    visualizer({
      open: true,
      filename: 'build-stats.html',
    }), // alway at end
  ],
  server: {
    port: 8080, // ✅ Change dev server port here
    host: '0.0.0.0', // optional: allows access from network IP,
    allowedHosts: ['mqg-style-counsel.azurewebsites.net'],
  },
});
