import type { Component } from '@vunk-server/jsx-runtime'
import type { Middleware } from 'koa'
import { Deferred } from '@vunk/core/shared/utils-promise'
import VkError from '@vunk-server/components/error'
import { createApp, createElement, h, inject, Suspense } from '@vunk-server/jsx-runtime'
import { KoaKey } from '../useKoa'

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

    const successApp = createApp({
      errorCaptured,
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
    })
    successApp.mount(root)

    function errorCaptured (error: Error) {
      successApp.unmount()

      createApp({
        setup () {
          return () => h(Suspense, {
            onResolve,
          }, h(VkError, { error }))
        },
      }).mount(root)
    }

    function onResolve () {
      ctx.body = root.value
      next().then(nextDef.resolve)
    }

    await nextDef.promise
  }
}
