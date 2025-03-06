import { inject } from '@vunk-server/runtime-body'
import { KoaKey } from './const'

export function useKoa () {
  const koa = inject(KoaKey, null)
  if (!koa) {
    throw new Error('useKoa() is called without providing koa')
  }
  return koa
}

export * from './const'
