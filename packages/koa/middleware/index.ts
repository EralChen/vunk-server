import type { Component } from '@vunk-server/jsx-runtime'
import type { Middleware } from 'koa'
import { Deferred } from '@vunk/core/shared/utils-promise'
import { createApp, createElement, h, inject, Suspense } from '@vunk-server/jsx-runtime'
import { KoaKey } from '../'

export function middleware<
  T extends Component,
> (
  Component: T,
): Middleware {
  return async (ctx, next) => {
    const root = createElement('root')

    const query = ctx.query
    const json = await ctx.request?.json()

    const nextDef = new Deferred()

    createApp({
      setup (_, { slots }) {
        inject(KoaKey, { context: ctx })
        return () => h(
          Suspense,
          {
            onResolve,
          },
          h(
            Component,
            {
              ...json,
              ...query,
            },
            slots,
          ),
        )
      },
    }).mount(root)

    function onResolve () {
      ctx.body = root.value
      next().then(nextDef.resolve)
    }

    await nextDef.promise
  }
}
