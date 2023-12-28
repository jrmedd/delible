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
        description: 'Delible ink isn’t permanent. Put down your thoughts and they’ll fade at the end of the day.',
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
        scope: 'https://delible.ink',
        id: '?homescreen=1',
        display: 'standalone',
        orientation: 'portrait',
        display_override: [
          'standalone',
          'window-controls-overlay'
        ],
        launch_handler: {
          client_mode: 'focus-existing'
        },
        handle_links: 'preferred',
        dir: 'ltr',
        categories: ['health', 'lifestyle', 'utilities'],
        screenshots: [
          {
            src: 'delible-ink-macos.webp',
            sizes: '1280x800',
            type: 'image/webp',
            form_factor: 'wide',
            label: 'Delible Ink. on macOS'
          },
          {
            src: 'delible-ink-ios.webp',
            sizes: '1290x2796',
            type: 'image/webp',
            form_factor: 'narrow',
            label: 'Delible Ink. on iOS'
          }
        ]
      }
    })
  ]
})
