import type { Middleware } from 'koa'
import VkError from '@vunk-server/components/error'

export const CatchErrorMiddleware: Middleware = async (ctx, next) => {
  try {
    await next()
  }
  catch (err) {
    if (
      ctx.body?.data
      && ctx.body.data.component === VkError.name
    ) {
      // Do something your error handling here
      return
    }

    throw err
  }
}
