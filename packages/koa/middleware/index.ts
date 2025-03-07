import type { Component } from '@vunk-server/runtime-json'
import type { Middleware, ParameterizedContext } from 'koa'
import { randomUUID } from 'node:crypto'
import { createApp, h, inject, InjectionKey } from '@vunk-server/runtime-json'
import consola from 'consola'
import { KoaKey } from '../'

export function middleware<
  T extends Component,
> (
  Component: T,
): Middleware {
  return async (ctx, next) => {
    const app = {
      id: randomUUID(),
    }

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
    }).mount(app)

    consola.log('mounting app', app)
  }
}
