import { } from 'npm:@vunk/server'
import { Hono } from 'npm:hono'

const app = new Hono()
const kv = await Deno.openKv()

// Redirect root URL
app.get('/', c => c.redirect('/books'))

// List all books
app.get('/books', async (c) => {
  const iter = await kv.list({ prefix: ['books'] })
  const books = []
  for await (const res of iter) books.push(res)

  return c.json(books)
})

Deno.serve({ port: 3000, hostname: '0.0.0.0' }, app.fetch)
