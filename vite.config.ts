import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // Please make sure that '@tanstack/router-plugin' is passed before '@vitejs/plugin-react'
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
    react(),
    // ...,
  ],
  server: {
    port: 8080, // ✅ Change dev server port here
    host: '0.0.0.0', // optional: allows access from network IP,
    allowedHosts: ['mqg-style-counsel.azurewebsites.net'],
  },
});
