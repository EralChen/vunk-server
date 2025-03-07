import type { InjectionKey } from '@vunk-server/jsx-runtime'
import type { ParameterizedContext } from 'koa'

export type KoaInjection = InjectionKey<{
  context: ParameterizedContext
}>
