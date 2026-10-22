import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Forward /api requests to the backend that saves contact messages to SQLite
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
});
