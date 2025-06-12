import fs from 'node:fs'
import KoaRouter from '@koa/router'
import { CatchErrorMiddleware, middleware } from '@vunk-server/koa'
import { restFetch } from '@vunk-server/shared'
import consola from 'consola'
import Koa from 'koa'
import koaBodyParsers from 'koa-body-parsers'
import { loadEnvMeta } from '../utils/loadEnv'
import DownloadView from './views/download'
import ErrorView from './views/error'
import FileView from './views/file'
import PrismaTryView from './views/prisma_try'
import ResponseView from './views/response'
import TableView from './views/table'
import UploadView from './views/upload'

const { env } = loadEnvMeta()

restFetch.baseURL = env.VITE_BASE_API
consola.info('VITE_BASE_API', env.VITE_BASE_API)

const app = new Koa()
const router = new KoaRouter()

koaBodyParsers(app)

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Headers', ['Content-Type', 'x-requested-with'])

  await next()
})

app.use(CatchErrorMiddleware)

router.post('/response', middleware(ResponseView))
router.get('/error', middleware(ErrorView))

router.get('/table', middleware(TableView))

router.post('/upload', middleware(UploadView))
router.get('/download/:id', middleware(DownloadView))

router.get('/file', middleware(FileView))
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
