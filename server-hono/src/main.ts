import type { NormalObject } from '@vunk/shared'
import { serve } from '@hono/node-server'
import { middleware } from '@vunk-server/hono'
import consola from 'consola'
import { Hono } from 'hono'
import ResponseView from './views/response'

const app = new Hono<{
  Variables: {
    body: NormalObject
  }
}>()

app.get('/', c => c.text('Welcome to the Hono server!'))

app.get('/response', middleware(ResponseView), async (c) => {
  const data = c.get('body')
  return c.json(data)
})

serve(app, () => {
  consola.log('Hono server is running on http://localhost:3000')
})
