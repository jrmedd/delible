import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            'babel-plugin-styled-components',
            {
              displayName: false,
              fileName: false,
              minify: true,
              transpileTemplateLiterals: false
            }
          ]
        ]
      }
    }),
    VitePWA({
      workbox: {
        globPatterns: ['**/*']
      },
      includeAssets: [
        '**/*'
      ],
      manifest: {
        name: 'Delible ink.',
        short_name: 'Delible ink.',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/maskable-icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        theme_color: '#faf5e9',
        background_color: '#faf5e9',
        start_url: 'https://delible.ink',
        display: 'standalone',
        orientation: 'portrait'
      }
    })
  ]
})
