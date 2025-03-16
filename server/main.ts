import fs from 'node:fs'
import KoaRouter from '@koa/router'
import { CatchErrorMiddleware, middleware } from '@vunk-server/koa'
import consola from 'consola'
import Koa from 'koa'
import koaBodyParsers from 'koa-body-parsers'
import ErrorView from './src/views/error'
import ResponseView from './src/views/response'

const app = new Koa()
const router = new KoaRouter()

koaBodyParsers(app)

// 处理跨域
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  await next()
})

app.use(CatchErrorMiddleware)

router.get('/response', middleware(ResponseView))
router.get('/error', middleware(ErrorView))

app.use(router.routes())
app.use(router.allowedMethods())

process.on('unhandledRejection', (err) => {
  // 将错误信息发送到 dist/err.log 文件
  fs.promises.appendFile(
    'dist/err.log',
    `${new Date().toISOString()} - ${err}\n\n`,
  )
})

app.listen(process.env.PORT || 3000, () => {
  consola.log(`Server is running on http://localhost:${process.env.PORT || 3000}`)
})
