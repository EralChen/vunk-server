import consola from 'consola'
import Koa from 'koa'

const app = new Koa()

// Response time middleware
app.use(async (ctx, next) => {
  const start = Date.now()
  consola.log('Start')
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

// Logger middleware
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  consola.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// Error handler middleware
app.use(async (ctx, next) => {
  try {
    await next()
  }
  catch (err: any) {
    consola.error(err)
    ctx.status = err.status || 500
    ctx.body = {
      error: {
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {}),
      },
    }
    ctx.app.emit('error', err, ctx)
  }
})

app.listen(process.env.PORT || 3000, () => {
  consola.log(`Server is running on http://localhost:${process.env.PORT || 3000}`)
})
