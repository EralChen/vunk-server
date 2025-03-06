import type { Component } from '@vunk-server/runtime-body'
import type { Middleware, ParameterizedContext } from 'koa'
import { createApp, h, inject, InjectionKey } from '@vunk-server/runtime-body'
import { KoaKey } from '../'

export function middleware<
  T extends Component,
> (
  options: T,
): Middleware {
  return async (ctx, next) => {
    createApp({
      setup (_, { slots }) {
        inject(KoaKey, { context: ctx })

        return () => h(
          options,
          null,
          slots,
        )
      },
    }).mount(ctx)
  }
}
