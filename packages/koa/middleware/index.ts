import type { Component, ComponentPublicInstance } from '@vunk-server/jsx-runtime'
import type { Middleware } from 'koa'
import { Deferred } from '@vunk/core/shared/utils-promise'
import { VkError } from '@vunk-server/components/error'
import { createApp, createElement, h, inject, provide, Suspense } from '@vunk-server/jsx-runtime'
import { KoaKey } from '../useKoa'

export function middleware<
  T extends Component,
> (
  Component: T,
): Middleware {
  return async (ctx, next) => {
    const root = createElement('root')

    const query = ctx.query
    const json = await ctx.request.body()
    const nextDef = new Deferred()

    const successApp = createApp({
      errorCaptured,
      setup (_, { slots }) {
        provide(KoaKey, { context: ctx })
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

    function errorCaptured (
      error: Error,
      instance: ComponentPublicInstance,
      info: string,
    ) {
      successApp.unmount()

      createApp({
        mounted: onResolve,
        setup () {
          inject(KoaKey, { context: ctx })
          return () => h(
            VkError,
            {
              error,
              instance: instance.$options.name,
              info,
            },
          )
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
