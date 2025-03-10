import { defineComponent, h } from '@vunk-server/jsx-runtime'
import { middleware } from '@vunk-server/koa'
import consola from 'consola'
import Koa from 'koa'
import KoaBody from 'koa-body-parsers'
import { it } from 'vitest'

const Hello = defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup (props, ctx) {
    consola.log('props', props, ctx)
    return () => h(
      'div',
      null,
      `Hello ${props.id}, ${ctx.attrs.test}, ${ctx.attrs.test2}`,
    )
  },
})

it('should work', () => {
  const app = new Koa()
  KoaBody(app)

  app.use(async (ctx, next) => {
    const body = ctx.body
    consola.log('ctx.body', body)
    await next()
  })

  app.use(middleware(Hello))

  app.use(async (ctx, next) => {
    consola.log('ctx.body', ctx.body)
    await next()
  })

  // 启动服务器
  app.listen(3000)
  // 发送请求
  fetch('http://localhost:3000?test=xxx&test2=xxx2', {
    body: JSON.stringify({
      id: 'hhhhhh',
    }),
    method: 'POST',
  })
})
