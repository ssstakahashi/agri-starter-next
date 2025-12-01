import { Hono } from 'hono'
import { poweredBy } from 'hono/powered-by'

const app = new Hono<{
  Bindings: {
    MY_VAR: string
  }
}>()

app.use(poweredBy())
app.get('/hono', (c) => c.text('Hono！！！！, ' + c.env.MY_VAR))

export default app
