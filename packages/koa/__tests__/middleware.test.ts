import { defineComponent, h } from '@vunk-server/jsx-runtime'
import { middleware } from '@vunk-server/koa'
import consola from 'consola'
import Koa from 'koa'
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
      `Hello ${props.id}`,
    )
  },
})

it('should work', () => {
  const app = new Koa()

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
  fetch('http://localhost:3000')
})
