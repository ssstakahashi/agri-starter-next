import { vitePlugin as remix, cloudflareDevProxyVitePlugin } from '@remix-run/dev'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    cloudflareDevProxyVitePlugin(),
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_lazyRouteDiscovery: true,
        v3_relativeSplatPath: true,
        v3_singleFetch: true,
        v3_throwAbortReason: true
      }
    })
  ],
  ssr: {
    noExternal: ['bcryptjs']
  },
  resolve: {
    alias: {
      // Removed crypto alias to use native Web Crypto API provided by Cloudflare Workers
      stream: 'stream-browserify'
    }
  }
})
