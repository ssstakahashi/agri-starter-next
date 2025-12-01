import { type PlatformProxy } from 'wrangler'

interface Env {
  MY_VAR: string
  DB: D1Database
  IMAGES: R2Bucket
}

type Cloudflare = Omit<PlatformProxy<Env>, 'dispose'>

declare module '@remix-run/cloudflare' {
  interface AppLoadContext {
    cloudflare: Cloudflare
  }
}
