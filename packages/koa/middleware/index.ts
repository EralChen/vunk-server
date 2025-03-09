import type { Component } from '@vunk-server/jsx-runtime'
import type { Middleware } from 'koa'
import { createApp, createElement, h, inject } from '@vunk-server/jsx-runtime'
import consola from 'consola'
import { KoaKey } from '../'

export function middleware<
  T extends Component,
> (
  Component: T,
): Middleware {
  return async (ctx, next) => {
    const root = createElement('')

    createApp({
      setup (_, { slots }) {
        inject(KoaKey, { context: ctx })
        return () => h(
          Component,
          {
            id: 'testid',
          },
          slots,
        )
      },
    }).mount(root)

    ctx.body = root.value
    consola.log('mounting app', ctx.body)
    await next()
  }
}
