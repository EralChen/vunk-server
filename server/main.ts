import fs from 'node:fs'
import KoaRouter from '@koa/router'
import { CatchErrorMiddleware, middleware } from '@vunk-server/koa'
import consola from 'consola'
import Koa from 'koa'
import koaBodyParsers from 'koa-body-parsers'
import ErrorView from './src/views/error'
import PrismaTryView from './src/views/prisma_try'
import ResponseView from './src/views/response'
import UploadView from './src/views/upload'

const app = new Koa()
const router = new KoaRouter()

koaBodyParsers(app)

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Headers', 'Content-Type')

  await next()
})

app.use(CatchErrorMiddleware)

router.post('/response', middleware(ResponseView))
router.get('/error', middleware(ErrorView))
router.post('/upload', middleware(UploadView))
router.get('/prisma_try', middleware(PrismaTryView))

app.use(router.routes())
app.use(router.allowedMethods())

process.on('unhandledRejection', (err) => {
  // 将错误信息发送到 dist/err.log 文件
  fs.promises.appendFile(
    'dist/err.log',
    `${new Date().toISOString()} - ${err}\n\n`,
  )
})

app.listen(process.env.PORT || 4545, () => {
  consola.log(`Server is running on http://localhost:${process.env.PORT || 4545}`)
})
