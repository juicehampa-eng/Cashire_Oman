import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'icons/*.png'],
      manifest: {
        name: 'Cashier App',
        short_name: 'Cashier',
        start_url: '.',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ff6600',
        icons: [
          {
            src: '/icons/login-icon.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/login-icon.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
