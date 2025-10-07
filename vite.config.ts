import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // ensures built site works even when opened via file:// or in subfolder
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'], // keeps lucide out of pre-bundle
  },
  build: {
    chunkSizeWarningLimit: 1200, // increase warning threshold
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
});
