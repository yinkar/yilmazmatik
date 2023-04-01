import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/yilmazmatik',
  plugins: [
    vue(),
    VitePWA({
      workbox: {
        cleanupOutdatedCaches: false,
        sourcemap: true,
      },
      includeAssets: [
        'favicon.png',
        'robots.txt',
        'icon-192.png',
        'icon-512.png',
      ],
      manifest: {
          "name": "Yilmazmatik",
          "short_name": "Yilmazmatik",
          "description": "Random idioms of Yılmaz from Gibi series",
          "theme_color": "#0099e6",
          "background_color": "#3c3c3d",
          "icons": [
              {
                  "src": "icon-192.png",
                  "sizes": "192x192",
                  "type": "image/png",
                  "purpose": "any maskable",
              },
              {
                  "src": "icon-512.png",
                  "sizes": "512x512",
                  "type": "image/png",
                  "purpose": "any maskable",
              }
          ],
      },
    }),
  ],
});
