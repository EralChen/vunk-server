import type { Component, ComponentPublicInstance } from '@vunk-server/jsx-runtime'
import type { MiddlewareHandler } from 'hono'
import { Deferred } from '@vunk/core/shared/utils-promise'
import { VkError } from '@vunk-server/components/error'
import { createApp, createElement, h, inject, provide, Suspense } from '@vunk-server/jsx-runtime'
import { HonoKey } from '../useHono'

export function middleware<
  T extends Component,
> (
  Component: T,
): MiddlewareHandler {
  return async (ctx, next) => {
    const root = createElement('root')

    const query = ctx.req.query()
    const params = ctx.req.param()
    const body = await ctx.req.json().catch(() => ({}))
    const nextDef = new Deferred()

    const successApp = createApp({
      errorCaptured,
      setup (_, { slots }) {
        provide(HonoKey, { context: ctx })
        return () => h(
          Suspense,
          {
            onResolve,
          },
          h(
            Component,
            {
              ...body,
              ...query,
              ...params,
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
          inject(HonoKey, { context: ctx })
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
      ctx.set('body', root.value)
      next().then(nextDef.resolve)
    }

    await nextDef.promise
  }
}
