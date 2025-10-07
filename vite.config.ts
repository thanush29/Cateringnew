import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Important for static hosting
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion'],
          supabase: ['@supabase/supabase-js'],
          ui: ['lucide-react'],
        },
      },
    },
  },
  // 👇 Vite-specific fix for SPA routing
  server: {
    fs: {
      strict: false,
    },
    middlewareMode: false,
  },
  preview: {
    // 👇 this makes /admin/login etc. work in preview/live mode
    headers: {
      'Cache-Control': 'no-cache',
    },
  },
});
