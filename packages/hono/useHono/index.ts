import { inject } from '@vunk-server/jsx-runtime'
import { HonoKey } from './const'

export function useHono () {
  const koa = inject(HonoKey, null)
  if (!koa) {
    throw new Error('useHono() is called without providing Hono')
  }
  return koa
}

export * from './const'
