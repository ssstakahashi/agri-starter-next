import { Hono } from 'hono'
import { poweredBy } from 'hono/powered-by'
import { staticAssets } from 'remix-hono/cloudflare'
import { remix } from 'remix-hono/handler'
// @ts-expect-error it's not typed
import * as build from 'virtual:remix/server-build'

const app = new Hono<{
  Bindings: {
    MY_VAR: string
  }
}>()

app.use(poweredBy())
app.get('/hono', (c) => c.text('Hono！！！！, ' + c.env.MY_VAR))

if (process.env.NODE_ENV !== 'development' || import.meta.env.PROD) {
  app.use('*', staticAssets())
}

app.use(
  remix({
    build,
    mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
    getLoadContext(c) {
      return {
        cloudflare: {
          env: c.env
        }
      }
    }
  })
)

export default app
