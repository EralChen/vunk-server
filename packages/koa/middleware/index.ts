import type { Middleware } from 'koa'
import { type Component, createApp, type DefineComponent } from '@vunk-server/runtime-body'

export function middleware<
  T extends Component,
> (
  options: T,
): Middleware {
  return async (ctx, next) => {
    const app = createApp({
      setup (_, { slots }) {
        return slots.default?.()
      },
    }).mount(ctx)
  }
}
