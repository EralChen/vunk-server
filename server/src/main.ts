import { middleware } from '@vunk-server/koa'
import consola from 'consola'
import Koa from 'koa'
import koaBodyParsers from 'koa-body-parsers'
import HelloWorld from './components/hello-world'

const app = new Koa()
koaBodyParsers(app)

// Response time middleware
app.use(middleware(HelloWorld))

app.listen(process.env.PORT || 3000, () => {
  consola.log(`Server is running on http://localhost:${process.env.PORT || 3000}`)
})
