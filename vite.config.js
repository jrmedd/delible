import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    basicSsl({ name: 'localhost', domains: ['localhost'], certDir: './' }),
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
      manifest: false
    })
  ]
})
